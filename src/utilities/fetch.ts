import yaml from 'js-yaml'
import DOMPurify from 'dompurify'

/**
 * Config used for DOMPurify.
 * This config allows for most HTML elements and a handful of attributes
 * necessary for the site to load intended markdown/etc
 */
const domPurifyConfig = {
  ALLOW_ARIA_ATTR: true,
  ALLOWED_ATTR: [
    'alt',
    'href',
    'style',
    'title',
  ],
  ALLOWED_TAGS: [
    'a',
    'p',
    'span',

    'b',
    'em',
    'i',
    'mark',
    's',
    'sub',
    'sup',
    'small',
    'strike',
    'strong',
    'u',

    'abbr',
    'audio',
    'blockquote',
    'cite',
    'code',
    'data',
    'dfn',
    'div',
    'img',
    'pre',
    'samp',
    'time',
    'track',
    'var',
    'video',

    'figcaption',
    'figure',

    'br',
    'hr',
    'wbr',

    'ol',
    'ul',
    'li',

    'dd',
    'dl',
    'dt',
  ],
}

/**
 * Fetches, sanitizes, and parses YAML files
 * @param path the path of the YAML file to load
 * @returns the content of the YAML file after sanitizing then parsing
 */
export const fetchAndParseYaml = async (path: string) => {
  const response = await fetch(path)
  const blob = await response.blob()
  const yamlAsString = await blob.text()
  const sanitized = DOMPurify.sanitize(yamlAsString, domPurifyConfig)
  return yaml.load(sanitized)
}

/**
 * Fetches content type from an image
 * @param path the path of the file to check
 * @returns the Content-Type header of the file
 */
export const getContentType = async (path: string) => {
  const response = await fetch(path, {method: 'HEAD'})
  return response.headers.get('Content-Type')
}

/**
 * Creates a Promise which waits for a condition to be true
 * @param condition the condition which should be met
 * @param interval the period of time (ms) to wait between attempts
 * @param tries the number of attempts (up to and including this number) to try before determining the condition couldn't be met
 * @returns A Promise which will resolve when the condition is met or reject if timed out after a period of `(interval * tries)`
 */
export const awaitCondition = (condition: () => boolean, interval: number = 100, tries: number = 100) => {
  return new Promise<void>((resolve, reject) => {
    let _attempts = 1
    const wait: any = () => {
      _attempts += 1
      console.log(condition())
      if (condition()) {
        return resolve()
      } else if (_attempts > tries) {
        reject()
      } else {
        setTimeout(wait, interval)
      }
    }
    wait()
  })
}

/**
 * Methods related to local storage
 */
export const storage = {
  /**
   * Retrieves a value from local storage
   * @param key the key of the local storage item
   * @returns the parsed object or null
   */
  read: <T>(key: string) => {
    const value = window.localStorage.getItem(key)
    return !!value
      ? JSON.parse(value) as T
      : null
  },

  /**
   * Stores a value to local storage
   * @param key the key of the local storage item
   * @param value the object to store
   */
  write: <T>(key: string, value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
}
