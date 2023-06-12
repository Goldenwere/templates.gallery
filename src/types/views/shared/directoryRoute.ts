import type templateType from './templateType'

/**
 * Represents routes present on the site.
 * Special route paths will use specially-made component views,
 * and all others will default to the main gallery component view.
 * See `directoryRoute.path` for special views.
 */
interface directoryRoute {
  /**
   * Optional maturity tag for a directory that will display a maturity warning when clicking buttons that navigate to the directory.
   * Defaults to false. Useful for compliance with some external websites.
   */
  mature?: boolean
  /**
   * The path of the directory used for routing. Paths by default route to the Gallery view.
   * Special paths will route to special views.
   *
   * 'tos': routes to terms of service view
   *
   * 'commission': routes to commissions view
   */
  path: string
  /**
   * Thumbnail/icon for buttons/icons representing the directory
   * Site will default to a generic icon if none is provided.
   */
  title: string
  /**
   * Thumbnail used for buttons that navigate to the directory.
   * Defaults to a generic icon when not defined.
   */
  thumbnailUrl?: string
  /**
   * The view template to use for the route
   * Defaults to templateType.gallery
   */
  template?: templateType
  /**
   * Whether to include the navigation in the site header
   * Defaults to false
   */
  hideFromHeader?: boolean
}

export default directoryRoute
