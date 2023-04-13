import type artWork from '@/src/types/artWork'
import type socialContact from '@/src/types/socialContact'

interface home {
  about?: string
  copyrightNotice: string
  social?: socialContact[]
  featured?: artWork[]
  logo?: string
}

export default home
