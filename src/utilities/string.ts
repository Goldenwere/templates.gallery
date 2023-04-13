/**
 * Capitalizes the first letter in a string
 * @param str the string to capitalize
 * @returns the string after capitalization
 */
export const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.slice(1)
}
