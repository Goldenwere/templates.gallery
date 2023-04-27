/**
 * An `artWork` is a greater piece of art with various details pertaining to it.
 * An `artWork` can contain `variants` that can be navigated deeper down into a gallery to explore said `variants`,
 * or will open a preview of the piece if it does not contain `variants`.
 * 
 * Technically every variable can be undefined, however this will just lead to generic placeholders being added that do nothing.
 * At minimum, `url` *OR* `variants` (which eventually filter to `artWork` with urls) should be defined,
 * unless using for the featured artwork on the home page, in which only thumbnailUrl and optionally title needs to be defined.
 */
interface artWork {
  /**
   * The date the piece was finished, published, or otherwise deemed complete.
   */
  date?: Date
  /**
   * [MARKDOWN OPTIONAL] Optional description of the piece.
   * Will not display anything if this is undefined.
   */
  description?: string
  /**
   * Folder ids that the piece will appear in. These should correspond with what folders are defined
   * 
   * NOTE: This is an array of folder.id, hierarchy is irrelevant to the artwork.
   * 
   * NOTE: This is disregarded on variants,
   * so organize this at the root artWork according to the variants available to a piece,
   * or avoid using variants.
   */
  folders?: string[]
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
   * The title of the piece.
   * Defaults to 'untitled' if not defined.
   */
  title?: string
  /**
   * The CSS background-position of the thumbnail of the piece. Only relevant if used as a featured piece.
   * The default is the CSS default for `background-position`
   */
  thumbnailPosition?: string
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