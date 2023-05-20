import type contractTerm from '@/src/types/views/shared/contractTerm'

/**
 * Model for TOS route data
 */
interface tosData {
  /** the last time the TOS was updated */
  lastUpdated: Date
  /** TOS contract terms */
  terms: contractTerm[]
}

export default tosData
