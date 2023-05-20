import type directoryRoute from '@/src/types/views/shared/directoryRoute'

/**
 * Modal for site data
 */
interface siteData {
  /** the gallery directories present on the site; see directoryRoute for more information on how to configure */
  directories: directoryRoute[]
  /** the url to the favicon */
  faviconUrl?: string
  /** the url to the logo */
  logo?: string
  /** the title of the site */
  title: string
  /** optional subtitle for the site, mainly used on the home page */
  subtitle?: string
}

export default siteData
