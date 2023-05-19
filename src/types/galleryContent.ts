import type folder from '@/src/types/folder'
import type galleryArtWork from '@/src/types/galleryArtWork'

interface galleryContent {
  folders?: folder[]
  work: { [key: string]: galleryArtWork }
}

export default galleryContent
