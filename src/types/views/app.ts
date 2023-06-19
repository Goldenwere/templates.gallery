import type AppTheme from '@/src/types/views/shared/appTheme'
import type DirectoryRoute from '@/src/types/views/shared/directoryRoute'

/**
 * Modal for site data
 */
interface AppViewModel {
  /** the gallery directories present on the site; see DirectoryRoute for more information on how to configure */
  directories: DirectoryRoute[]
  /** the url to the favicon */
  faviconUrl?: string
  /** the url to the logo */
  logo?: string
  /** the title of the site */
  title: string
  /** optional subtitle for the site, mainly used on the home page */
  subtitle?: string
  /** array of themes to use for app */
  themes?: AppTheme[]
}

export default AppViewModel
