import rfdc from 'rfdc'

const copy = rfdc()

/**
 * Creates a deep cloned copy of an object
 * @param toCopy the object to copy
 */
export const deepCopy = <T>(toCopy: T) => {
  return copy(toCopy)
}
