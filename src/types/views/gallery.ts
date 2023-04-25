import type artWork from '@/src/types/artWork'
import type folder from '@/src/types/folder'

interface gallery {
  folders?: folder[]
  work: artWork[]
}

export default gallery
