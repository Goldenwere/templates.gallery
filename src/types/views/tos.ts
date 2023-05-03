import type contractTerm from '@/src/types/contractTerm'

interface tos {
  /** the last time the TOS was updated */
  lastUpdated: Date
  /** TOS contract terms */
  terms: contractTerm[]
}

export default tos
