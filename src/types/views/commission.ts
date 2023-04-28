import type commissionType from '@/src/types/commissionType'

interface commission {
  commissionTypes: commissionType[]
  /** Optional descriptive header for the commission page */
  header?: {
    /** [MARKDOWN OPTIONAL] Body of text to put at the top of the commission page */
    description?: string
    /** An external link to a commission form */
    // For now, only linking to an external form is supported
    // May eventually introduce a self-hosted form, though this will require some sort of backend,
    // as the site is currently meant for hosting as a static/client-sided bucket
    form?: string
  }
}

export default commission
