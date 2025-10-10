import { kv } from '@vercel/kv'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const subscription = req.body
  if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
    return res.status(400).json({ error: 'Invalid subscription' })
  }

  const endpoint = subscription.endpoint
  await kv.hset('push:subscriptions', { [endpoint]: JSON.stringify(subscription) })
  return res.status(200).json({ ok: true })
}