import type folder from '@/src/types/internal/folder'
import type galleryArtWork from '@/src/types/internal/galleryArtWork'

/**
 * This is a converted version of GalleryViewModel to work with the site
 */
interface galleryContent {
  folders?: folder[]
  work: { [key: string]: galleryArtWork }
}

export default galleryContent
