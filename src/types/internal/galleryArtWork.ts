/**
 * This is a converted version of artWork to work with the site.
 */
interface artWork {
  _id: string
  date?: Date
  description?: string
  folders?: string[]
  mature?: boolean
  url?: string
  title?: string
  thumbnailPosition?: string
  thumbnailUrl?: string
  variants?: { [key: string]: artWork }
}

export default artWork