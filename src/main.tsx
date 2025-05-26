import '@/index.css'
import '@/lib/dayjs.ts'

import { createRoot } from 'react-dom/client'
import { Providers } from './providers.tsx'

createRoot(document.getElementById('root')!).render(<Providers />)
