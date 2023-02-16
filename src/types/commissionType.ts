/**
 * Represents a type of commission a commissioner can order.
 */
interface commissionType {
  /**
   * [MARKDOWN OPTIONAL] The details of a commission.
   */
  details: string
  /**
   * A set of media URLs to display as examples for a commissionType.
   */
  exampleUrls?: string[]
  /**
   * Optionally display the status of a commission type. E.g. Closed, Tentative, Opening Soon, etc.
   */
  status?: string
  /**
   * The title of the commissionType. E.g. Shaded, Sketch, etc.
   */
  title: string
}

export default commissionType
