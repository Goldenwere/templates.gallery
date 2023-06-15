import { v5 as uuidv5 } from 'uuid'
import { deepCopy } from '@/src/utilities/object'
import type ArtWork from '@/src/types/views/shared/artWork'
import type GalleryViewModel from '@/src/types/views/gallery'
import type GalleryArtWork from '@/src/types/internal/galleryArtWork'
import type GalleryContent from '@/src/types/internal/galleryContent'

/**
 * Amends a variant ArtWork with sensible defaults from a parent if certain optional data is missing
 * but present on the parent, carrying this down from the parent to its variants
 * Assumed variables carried downward are:
 * - title
 * - date
 * - description
 * - thumbnailPosition
 * @param parent the parent artwork in which the variant is pulling information from
 * @param variant the variant to amend
 * @returns a copy of the amended variant
 */
export const amendVariantWithDefaults = (parent: GalleryArtWork, variant: GalleryArtWork): GalleryArtWork => {
  const _variant = deepCopy(variant)
  if (_variant.title === undefined) {
    _variant.title = parent.title
  }
  if (_variant.date === undefined) {
    _variant.date = parent.date
  }
  if (_variant.description === undefined) {
    _variant.description = parent.description
  }
  if (_variant.thumbnailPosition === undefined) {
    _variant.thumbnailPosition = parent.thumbnailPosition
  }
  return _variant
}

/**
 * Amends ArtWork variants with sensible defaults from a parent if certain optional data is missing
 * but present on the parent, carrying this down from the parent to its variants
 * Assumed variables carried downward are:
 * - title
 * - date
 * - description
 * - thumbnailPosition
 * @param parent the parent artwork whose variants should return amended
 * @returns a copy of the amended variants
 */
export const amendVariantsWithDefaults = (parent: GalleryArtWork): {[key: string]: GalleryArtWork} => {
  const _variants = deepCopy(parent.variants as {[key: string]: GalleryArtWork})
  Object.keys(_variants).forEach((key) => {
    _variants[key] = amendVariantWithDefaults(parent, _variants[key])
  })
  return _variants as {[key: string]: GalleryArtWork}
}

/**
 * Converts fetched `ArtWork` from the expected YAML data model to a workable keyed format.
 * This function will recursively handle `ArtWork.variants`
 * @param work the ArtWork array in the YAML data
 * @param uuidNamespace the UUID namespace to apply to the UUID generator
 * @returns object keyed by each ArtWork's newly generated _id, where the value is the converted ArtWork
 */
export const convertArtWorkData = (work: ArtWork[], uuidNamespace: string): { [key: string]: GalleryArtWork } => {
  const _return: { [key: string]: GalleryArtWork } = {}
  const _work = deepCopy(work)
  _work.forEach((_piece) => {
    const _copy: GalleryArtWork = {
      ..._piece,
      // prevent type error from copying _piece due to variants being in the wrong format
      variants: undefined,
      // amend an id that should be safely unique,
      // because at minimum the thumbnailUrl or url (depending on which is set), will be unique within the hierarchy
      // that the user is navigated to. thumbnails and thus uuids can be re-used between variant levels,
      // as the uuid is only necessary to prevent naming conflicts in the keyed GalleryArtWork objects
      _id: uuidv5(`${_piece.title}${_piece.url}${_piece.thumbnailUrl}${_piece.date}`, uuidNamespace),
    }
    if (_piece.variants) {
      // recurse with variants if present
      _copy.variants = convertArtWorkData(_piece.variants, uuidNamespace)
    }
    _return[_copy._id] = _copy
  })
  return _return
}

/**
 * Converts fetched `gallery` from the expected YAML data model to a workable format
 * @param content the `gallery` content to convert
 * @param uuidNamespace the UUID namespace to apply to the UUID generator
 * @returns the converted `content`
 */
export const convertGalleryData = (content: GalleryViewModel, uuidNamespace: string): GalleryContent => {
  const _content: GalleryContent = {
    folders: deepCopy(content.folders || []),
    work: convertArtWorkData(content.work, uuidNamespace),
  }
  return _content
}
