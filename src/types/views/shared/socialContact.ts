/**
 * A social contact is a page element used to represent some sort of external reference,
 * with options for categorizing, url linking, and subtitles
 */
interface SocialContact {
  /**
   * Allows for the site to sort contact information by category.
   * Any social contact missing a category will be categorized as miscellaneous.
   * If all social contacts are miscellaneous, the site will disable categorization.
   */
  category?: string
  /**
   * Optional subtitle for social contact.
   * Example use case would be to set title to {some website} and subtitle to @{user handle}, or visa versa.
   * Only displays if defined.
   */
  subtitle?: string
  /**
   * The text displayed with a social contact.
   */
  title: string
  /**
   * Thumbnail/icon for buttons/icons representing the contact
   * Site will default to a generic icon if none is provided.
   */
  thumbnailUrl?: string
  /**
   * The url added to the social contact.
   * If the contact does not link to anything, a link is not added.
   * Note that this will be implemented with standard HTML <a> tags, so protocols like mailto: will work here.
   */
  url?: string
}

export default SocialContact
