export const deepCopy = <T>(toCopy: T) => {
  return JSON.parse(JSON.stringify(toCopy)) as T
}
