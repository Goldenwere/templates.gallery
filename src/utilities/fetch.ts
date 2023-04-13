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
