import directoryRoute from '@/types/directoryRoute'
import artWork from '@/types/artWork'
import socialContact from '@/types/socialContact'

interface home {
  directories: directoryRoute[]
  social?: socialContact[]
  featured?: artWork[]
  faviconUrl?: string
  title: string
  subtitle?: string
  logo?: string
}

export default home