import { deepCopy } from '@/src/utilities/object'
import type folder from '@/src/types/internal/folder'

/**
 * Utility recursive function that flattens folder hierarchy into an array of options
 * @param folders the original folders to map from
 * @param depth the current depth to keep track of for indenting purposes; the initial call should default to 0
 */
export const flattenFolders = (folders: folder[], depth: number = 0): object[] => {
  return folders.flatMap((other) => [
    {
      ...deepCopy(other),
      displayName: getFolderDisplayName(other.displayName || other.id, depth),
      // folders no longer needs to be set due to the flattening process
      folders: undefined,
      // depth replaces folders instead
      depth,
    },
    ...flattenFolders(other.folders || [], depth + 1)
  ])
}

/**
 * Utility to map folder depth to indentation
 * @param original the original display name of the folder
 * @param depth the depth of the folder
 */
export const getFolderDisplayName = (original: string, depth: number = 0) => {
  let padding = ''
  for (let i = 0; i < depth; ++i) {
    padding += '&nbsp;'
  }
  return `${padding}${original}`
}
