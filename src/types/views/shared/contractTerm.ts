/**
 * Represents a section of terms for Terms of Service.
 * Can be further divided into subsections by passing `terms` as `ContractTerm[]`
 */
interface ContractTerm {
  /**
   * [MARKDOWN OPTIONAL] Simplified version of the terms.
   * Ignored if terms is an array of `ContractTerm` and intro is unset.
   */
  simple?: string
  /**
   * [MARKDOWN OPTIONAL] An introductory section of terms if `terms` is set to an array of `ContractTerm`.
   * This will still be inserted if `terms` is just a string, but is intended for `terms` being `ContractTerm[]`
   */
  intro?: string
  /**
   * [MARKDOWN OPTIONAL (if string)] TOS terms, either a collection of more terms, or a string.
   */
  terms: ContractTerm[] | string
  /**
   * Title to display above the term.
   */
  title: string
}

export default ContractTerm
