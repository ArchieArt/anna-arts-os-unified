import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'

export const grantRouter = router({
  // Get grant matches for artist
  getMatches: protectedProcedure.query(async ({ ctx }) => {
    const artist = await ctx.prisma.artist.findUnique({
      where: { userId: ctx.userId },
    })

    if (!artist) {
      throw new Error('Artist profile not found')
    }

    const matches = await ctx.prisma.grantArtistMatch.findMany({
      where: { artistId: artist.id },
      include: { grant: true },
      orderBy: { matchScore: 'desc' },
    })

    return matches
  }),

  // Get grant details
  getGrant: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const grant = await ctx.prisma.grant.findUnique({
      where: { id: input },
    })

    if (!grant) {
      throw new Error('Grant not found')
    }

    return grant
  }),

  // Get all available grants
  getAllGrants: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.grant.findMany({
      where: {
        deadline: {
          gt: new Date(),
        },
      },
      orderBy: { deadline: 'asc' },
      take: 20,
    })
  }),

  // Mark grant as applied
  markApplied: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.grantArtistMatch.update({
        where: { id: input },
        data: { status: 'APPLIED' },
      })
    }),
})
