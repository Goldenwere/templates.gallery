/**
 * An `ArtWork` is a greater piece of art with various details pertaining to it.
 * An `ArtWork` can contain `variants` that can be navigated deeper down into a gallery to explore said `variants`,
 * or will open a preview of the piece if it does not contain `variants`.
 * 
 * Technically every variable can be undefined, however this will just lead to generic placeholders being added that do nothing.
 * At minimum, `url` *OR* `variants` (which eventually filter to `ArtWork` with urls) should be defined,
 * unless using for the featured artwork on the home page, in which only thumbnailUrl and optionally title needs to be defined.
 * 
 * When an `ArtWork` is read into the gallery, it is modified to contain an _id, which is a UUID generated
 * based off a combination of the `title`, `url`, `thumbnailUrl`, and `date`.
 * It is assumed that you will only use a `thumbnailUrl`/`url` once within a hierarchical level of variants.
 * Between levels, `thumbnailUrl` can be re-used.
 * For example, at the root level of a gallery, each `ArtWork` has a different thumbnail.
 * One `ArtWork` has variants, and one of those variants re-uses the same thumbnail used at the root.
 * This variant doesn't change in title/date/url. While this would generate the same UUID, it won't collide with anything
 * due to it being nested.
 * The only point of collision would be if you defined 2+ `ArtWork` with the same exact `title`, `url`, `thumbnailUrl`, and `date`,
 * or lack of definition thereof,
 * all within the same hierarchical level (e.g. the root gallery).
 */
interface ArtWork {
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
   * so organize this at the root ArtWork according to the variants available to a piece,
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
   * `variants` can be nested up to around 50 times (depending on the name of the gallery).
   * This theoretical limit is specified in order to keep the URL under 2048 characters (the proposed maximum length of a URL),
   * as each variant will append a 36-character generated uuid (not including slash) to the url
   */
  variants?: ArtWork[]
}

export default ArtWork