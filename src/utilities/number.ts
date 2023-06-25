/**
 * Returns a random number within specified range
 * @param min minimum number in the range (inclusive)
 * @param max maximum number in the range (inclusive)
 * @returns A random number
 */
export const randomRange = (min: number, max: number) => {
  return Math.random() * ((max + 1) - min) + min
}

/**
 * Returns a random integer within specified range
 * @param min minimum number in the range (inclusive)
 * @param max maximum number in the range (inclusive)
 * @returns A random integer
 */
export const randomRangeInt = (min: number, max: number) => {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}
