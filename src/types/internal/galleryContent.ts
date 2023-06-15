import type Folder from '@/src/types/internal/folder'
import type GalleryArtWork from '@/src/types/internal/galleryArtWork'

/**
 * This is a converted version of GalleryViewModel to work with the site
 */
interface GalleryContent {
  folders?: Folder[]
  work: { [key: string]: GalleryArtWork }
}

export default GalleryContent
