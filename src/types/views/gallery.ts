import type ArtWork from '@/src/types/views/shared/artWork'
import type Folder from '@/src/types/internal/folder'

/**
 * Modal for gallery route data
 */
interface GalleryViewModel {
  /** collection of folders organized into a nested hierarchy with an id that corresponds to the art present in gallery.work */
  folders?: Folder[]
  /** the artwork in the gallery */
  work: ArtWork[]
}

export default GalleryViewModel
