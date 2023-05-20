import type artWork from '@/src/types/artWork'
import type folder from '@/src/types/folder'

/**
 * Modal for gallery route data
 */
interface galleryData {
  /** collection of folders organized into a nested hierarchy with an id that corresponds to the art present in gallery.work */
  folders?: folder[]
  /** the artwork in the gallery */
  work: artWork[]
}

export default galleryData
