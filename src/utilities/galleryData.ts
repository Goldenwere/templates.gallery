import { v5 as uuidv5 } from 'uuid'
import { deepCopy } from '@/src/utilities/object'
import type artWork from '@/src/types/views/shared/artWork'
import type galleryData from '@/src/types/views/gallery'
import type galleryArtWork from '@/src/types/internal/galleryArtWork'
import type galleryContent from '@/src/types/internal/galleryContent'

/**
 * Amends a variant artWork with sensible defaults from a parent if certain optional data is missing
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
export const amendVariantWithDefaults = (parent: galleryArtWork, variant: galleryArtWork): galleryArtWork => {
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
 * Amends artWork variants with sensible defaults from a parent if certain optional data is missing
 * but present on the parent, carrying this down from the parent to its variants
 * Assumed variables carried downward are:
 * - title
 * - date
 * - description
 * - thumbnailPosition
 * @param parent the parent artwork whose variants should return amended
 * @returns a copy of the amended variants
 */
export const amendVariantsWithDefaults = (parent: galleryArtWork): {[key: string]: galleryArtWork} => {
  const _variants = deepCopy(parent.variants as {[key: string]: galleryArtWork})
  Object.keys(_variants).forEach((key) => {
    _variants[key] = amendVariantWithDefaults(parent, _variants[key])
  })
  return _variants as {[key: string]: galleryArtWork}
}

/**
 * Converts fetched `artWork` from the expected YAML data model to a workable keyed format.
 * This function will recursively handle `artWork.variants`
 * @param work the artWork array in the YAML data
 * @param uuidNamespace the UUID namespace to apply to the UUID generator
 * @returns object keyed by each artWork's newly generated _id, where the value is the converted artWork
 */
export const convertArtWorkData = (work: artWork[], uuidNamespace: string): { [key: string]: galleryArtWork } => {
  const _return: { [key: string]: galleryArtWork } = {}
  const _work = deepCopy(work)
  _work.forEach((_piece) => {
    const _copy: galleryArtWork = {
      ..._piece,
      // prevent type error from copying _piece due to variants being in the wrong format
      variants: undefined,
      // amend an id that should be safely unique,
      // because at minimum the thumbnailUrl or url (depending on which is set), will be unique within the hierarchy
      // that the user is navigated to. thumbnails and thus uuids can be re-used between variant levels,
      // as the uuid is only necessary to prevent naming conflicts in the keyed galleryArtWork objects
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
export const convertGalleryData = (content: galleryData, uuidNamespace: string): galleryContent => {
  const _content: galleryContent = {
    folders: deepCopy(content.folders || []),
    work: convertArtWorkData(content.work, uuidNamespace),
  }
  return _content
}