import type ArtWork from './artWork'

/**
 * Represents a type of commission a commissioner can order.
 */
interface CommissionType {
  /**
   * [MARKDOWN OPTIONAL] The details of a commission.
   */
  details: string
  /**
   * A set of examples to display as examples for a CommissionType. Only need thumbnailUrl and alt from ArtWork class.
   */
  examples?: ArtWork[]
  /**
   * Optionally display the status of a commission type. E.g. Closed, Tentative, Opening Soon, etc.
   */
  status?: string
  /**
   * The title of the CommissionType. E.g. Shaded, Sketch, etc.
   */
  title: string
}

export default CommissionType
