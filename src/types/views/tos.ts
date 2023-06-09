import type ContractTerm from '@/src/types/views/shared/contractTerm'

/**
 * Model for TOS route data
 */
interface TosViewModel {
  /** the last time the TOS was updated */
  lastUpdated: Date
  /** TOS contract terms */
  terms: ContractTerm[]
}

export default TosViewModel
