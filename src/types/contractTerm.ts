/**
 * Represents a section of terms for Terms of Service.
 * Can be further divided into subsections by passing `terms` as `contractTerm[]`
 */
interface contractTerm {
  /**
   * Simplified version of the terms.
   * Ignored if terms is an array of `contractTerm` and intro is unset.
   */
  simple?: string
  /**
   * An introductory section of terms if `terms` is set to an array of `contractTerm`.
   * This will still be inserted if `terms` is just a string, but is intended for `terms` being `contractTerm[]`
   */
  intro?: string
  /**
   * TOS terms, either a collection of more terms, or a string.
   */
  terms: contractTerm[] | string
  /**
   * Title to display above the term if applicable.
   */
  title?: string
}

export default contractTerm
