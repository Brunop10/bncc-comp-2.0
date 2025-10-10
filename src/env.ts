import { z } from 'zod'

const envSchema = z.object({
  VITE_API_APP_SHEET_URL: z.string().url(),
  VITE_PUSH_PUBLIC_KEY: z.string().optional(),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = {
  VITE_API_APP_SHEET_URL: _env.data.VITE_API_APP_SHEET_URL,
  VITE_PUSH_PUBLIC_KEY: _env.data.VITE_PUSH_PUBLIC_KEY ?? '',
}