import type ArtWork from '@/src/types/views/shared/artWork'
import type SocialContact from '@/src/types/views/shared/socialContact'

/**
 * Modal for home route data
 */
interface HomeViewModel {
  /** [MARKDOWN OPTIONAL] description about the artist, site, etc. */
  about?: string
  /** copyright notice displayed as is on the page */
  copyrightNotice: string
  /** list of social contacts that may be organized by their category */
  social?: SocialContact[]
  /** artwork featured on the landing page with a selected piece set as the home page's background */
  featured?: ArtWork[]
}

export default HomeViewModel
