/**
 * An `artWork` is a greater piece of art with various details pertaining to it.
 * An `artWork` can contain `variants` that can be navigated deeper down into a gallery to explore said `variants`,
 * or will open a preview of the piece if it does not contain `variants`.
 * 
 * Technically every variable can be undefined, however this will just lead to generic placeholders being added that do nothing.
 * At minimum, `url` *OR* `variants` (which eventually filter to `artWork` with urls) should be defined.
 */
interface artWork {
  date?: Date
  /**
   * Optional description of the piece.
   * Will not display anything if this is undefined.
   */
  description?: string
  /**
   * Optional maturity tag for an artwork, typically displayed in proximity to the thumbnail.
   * Defaults to false. Useful for compliance with some external websites.
   */
  mature?: boolean
  /**
   * The url of the piece.
   * This will be ignored if there are variants,
   * otherwise it should be a raw media/file that can also be displayed in the appropriate previewer
   * (i.e. audio file for audio, image file for images, text file for text)
   * 
   * NOTE: Only images are currently supported. A field for media type will be added when other media are supported.
   */
  url?: string
  /**
   * Optional tags to apply to the piece for use in searching within a directory or variants page
   */
  tags?: string[]
  /**
   * The title of the piece.
   * Defaults to 'untitled' if not defined.
   */
  title?: string
  /**
   * The url of the thumbnail of the piece.
   * The default of the thumbnail differs with decreasing priority depending on the work:
   * - If the artwork is an image, then use the url
   * - If no url, use the thumbnail of the first variant, or the url if no thumbnail and the variant is an image
   * - If no other condition satisfies, use a generic icon
   */
  thumbnailUrl?: string
  /**
   * `variants` allow for defining a number of variant pieces of a greater collection,
   * such as a commission with different options enabled on different exported images.
   * `variants`, if defined, will link and navigate deeper into a gallery.
   */
  variants?: artWork[]
}

export default artWork