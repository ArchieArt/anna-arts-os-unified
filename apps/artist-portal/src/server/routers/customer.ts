import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const customerRouter = router({
  // Get customer profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const customer = await ctx.prisma.customer.findUnique({
      where: { userId: ctx.userId },
      include: {
        enrolledCourses: {
          include: { course: true },
        },
        purchasedItems: { take: 10 },
      },
    })

    if (!customer) {
      throw new Error('Customer profile not found')
    }

    return customer
  }),

  // Browse artists
  browseArtists: protectedProcedure
    .input(
      z.object({
        category: z.string().optional(),
        city: z.string().optional(),
        take: z.number().default(12),
      })
    )
    .query(async ({ ctx, input }) => {
      const artists = await ctx.prisma.artist.findMany({
        where: {
          verificationStatus: 'VERIFIED',
        },
        include: { portfolios: { take: 1 } },
        take: input.take,
      })

      return artists
    }),

  // Get artist profile for customer
  getArtistProfile: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const artist = await ctx.prisma.artist.findUnique({
        where: { id: input },
        include: {
          portfolios: true,
          courses: true,
        },
      })

      if (!artist) {
        throw new Error('Artist not found')
      }

      return artist
    }),

  // Enroll in course
  enrollCourse: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const customer = await ctx.prisma.customer.findUnique({
        where: { userId: ctx.userId },
      })

      if (!customer) {
        throw new Error('Customer not found')
      }

      return await ctx.prisma.courseEnrollment.create({
        data: {
          customerId: customer.id,
          courseId: input,
          status: 'ENROLLED',
        },
      })
    }),

  // Get course progress
  getCourseProgress: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const customer = await ctx.prisma.customer.findUnique({
        where: { userId: ctx.userId },
      })

      if (!customer) {
        throw new Error('Customer not found')
      }

      return await ctx.prisma.courseEnrollment.findUnique({
        where: {
          customerId_courseId: {
            customerId: customer.id,
            courseId: input,
          },
        },
        include: { course: { include: { modules: true } } },
      })
    }),
})
