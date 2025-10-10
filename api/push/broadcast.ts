import webpush from 'web-push'
import { kv } from '@vercel/kv'

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY!
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!
const BROADCAST_SECRET = process.env.BROADCAST_SECRET

webpush.setVapidDetails('mailto:admin@example.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  if (BROADCAST_SECRET) {
    const auth = req.headers.authorization?.split(' ')[1]
    if (auth !== BROADCAST_SECRET) return res.status(401).json({ error: 'Unauthorized' })
  }

  const { title = 'Atualização disponível', body = 'Abra o app para conferir', url } = (req.body || {})
  const payloadObj = { title, body, url }
  const payloadUtf8 = Buffer.from(JSON.stringify(payloadObj), 'utf8')

  const entries = await (kv as any).hgetall('push:subscriptions') as Record<string, unknown> | null
  if (!entries) return res.status(200).json({ sent: 0, removed: 0 })

  let sent = 0
  let removed = 0

  const subs = Object.entries(entries)
  await Promise.all(
    subs.map(async ([endpoint, value]) => {
      try {
        const sub = typeof value === 'string' ? JSON.parse(value) : value
        await webpush.sendNotification(sub as any, payloadUtf8, { TTL: 3600, urgency: 'normal' })
        sent++
      } catch (err: any) {
        const status = err?.statusCode
        if (status === 404 || status === 410) {
          await (kv as any).hdel('push:subscriptions', endpoint)
          removed++
        }
      }
    })
  )

  return res.status(200).json({ sent, removed })
}