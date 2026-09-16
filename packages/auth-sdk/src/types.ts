import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: 'ARTIST' | 'SPONSOR' | 'CUSTOMER' | 'USER' | 'ADMIN'
      artistId?: string
      sponsorId?: string
      customerId?: string
    } & DefaultSession['user']
  }
}
