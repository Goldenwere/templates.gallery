/**
 * This is a converted version of ArtWork to work with the site.
 */
interface GalleryArtWork {
  _id: string
  date?: Date
  description?: string
  folders?: string[]
  mature?: boolean
  url?: string
  title?: string
  thumbnailPosition?: string
  thumbnailUrl?: string
  variants?: { [key: string]: GalleryArtWork }
}

export default GalleryArtWork