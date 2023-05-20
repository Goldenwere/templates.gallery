import type artWork from '@/src/types/artWork'
import type socialContact from '@/src/types/socialContact'

/**
 * Modal for home route data
 */
interface homeData {
  /** [MARKDOWN OPTIONAL] description about the artist, site, etc. */
  about?: string
  /** copyright notice displayed as is on the page */
  copyrightNotice: string
  /** list of social contacts that may be organized by their category */
  social?: socialContact[]
  /** artwork featured on the landing page with a selected piece set as the home page's background */
  featured?: artWork[]
}

export default homeData
