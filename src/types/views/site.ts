import type directoryRoute from '@/src/types/directoryRoute'

interface site {
  directories: directoryRoute[]
  faviconUrl?: string
  title: string
  subtitle?: string
}

export default site
