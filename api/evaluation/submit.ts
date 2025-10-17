import { google } from 'googleapis'
import type { IncomingMessage } from 'http'

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID 
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL 
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY 

const DEFAULT_MAX_QUESTIONS = 4
const DEFAULT_RANGE = 'Avaliacoes!A:Z'
const SHEETS_RANGE =
  process.env.GOOGLE_SHEETS_RANGE ||
  DEFAULT_RANGE

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_KEY) {
      return res.status(500).json({
        error: 'Missing Google Sheets credentials',
        missing: {
          SPREADSHEET_ID: !SPREADSHEET_ID,
          SERVICE_ACCOUNT_EMAIL: !SERVICE_ACCOUNT_EMAIL,
          SERVICE_ACCOUNT_KEY: !SERVICE_ACCOUNT_KEY,
        },
      })
    }

    const privateKey = SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n')
    const auth = new google.auth.JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    await auth.authorize()

    const sheets = google.sheets({ version: 'v4', auth })

    const payload = await readJsonBody(req)

    if (Array.isArray(payload) || Array.isArray((payload as any)?.records) || Array.isArray((payload as any)?.items)) {
      return res.status(400).json({
        error: 'Batch payload not supported',
        message: 'Envie apenas um registro direto do aplicativo.',
      })
    }

    function toRow(rec: any): (string | number)[] {
      const {
        participantName = '',
        participantAge = '',
        answers = [],
        comments = [],
        timestamp = new Date().toISOString(),
      } = rec || {}

      const normalizedAnswers = Array.isArray(answers)
        ? answers.map((a) => {
            if (typeof a === 'number') return a
            const n = Number(a)
            return Number.isFinite(n) ? n : ''
          })
        : []

      const maxQuestions = DEFAULT_MAX_QUESTIONS
      const answersPadded =
        maxQuestions && Number.isFinite(maxQuestions)
          ? [...normalizedAnswers, ...Array(Math.max(0, maxQuestions - normalizedAnswers.length)).fill('')]
          : normalizedAnswers

      const normalizedComments = Array.isArray(comments)
        ? (comments as any[])
            .map(c => (c ?? '').toString().trim())
            .filter(c => c.length > 0)
        : []

      return [timestamp, participantName || '', participantAge ?? '', ...answersPadded, ...normalizedComments]
    }

    const valuesRows = [toRow(payload)]

    const range = SHEETS_RANGE

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { majorDimension: 'ROWS', values: valuesRows },
    })

    return res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('[evaluation/submit] sheets error:', err?.message, err)
    const isProd = process.env.NODE_ENV === 'production'
    const payload = isProd
      ? { error: 'Failed to append to Google Sheets', message: err?.message || 'Unexpected error' }
      : {
          error: 'Failed to append to Google Sheets',
          message: err?.message,
          code: err?.code,
          name: err?.name,
          status: err?.status,
          details: err?.errors || err?.response?.data || undefined,
          stack: err?.stack,
        }
    return res.status(500).json(payload)
  }
}

async function readJsonBody(req: IncomingMessage): Promise<any> {
  return await new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => {
      if (typeof chunk === 'string') {
        chunks.push(Buffer.from(chunk, 'utf8'))
      } else {
        chunks.push(chunk as Buffer)
      }
    })
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        if (!raw) return resolve({})
        const obj = JSON.parse(raw)
        resolve(obj)
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}