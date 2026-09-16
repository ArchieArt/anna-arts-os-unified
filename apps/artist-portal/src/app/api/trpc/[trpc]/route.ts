import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/_app'
import { auth } from '@anna-arts/auth'

export async function POST(req: Request) {
  const session = await auth()

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      session,
    }),
  })
}

export async function GET(req: Request) {
  return POST(req)
}
