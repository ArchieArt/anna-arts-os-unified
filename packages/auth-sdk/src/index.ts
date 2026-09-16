import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcryptjs from 'bcryptjs'
import { prisma } from '@anna-arts/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) {
          throw new Error('User not found or no password set')
        }

        const isValidPassword = await bcryptjs.compare(
          credentials.password as string,
          user.password
        )

        if (!isValidPassword) {
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string

        // Enrich session with artist/sponsor/customer data
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: {
            artist: true,
            sponsor: true,
            customer: true,
          },
        })

        if (dbUser?.artist) {
          session.user.role = 'ARTIST'
          session.user.artistId = dbUser.artist.id
        } else if (dbUser?.sponsor) {
          session.user.role = 'SPONSOR'
          session.user.sponsorId = dbUser.sponsor.id
        } else if (dbUser?.customer) {
          session.user.role = 'CUSTOMER'
          session.user.customerId = dbUser.customer.id
        } else {
          session.user.role = 'USER'
        }
      }

      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
})
