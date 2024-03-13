import queryString, { StringifyOptions } from 'query-string'

export function getUrlWithQueryAndHash(
  object: {
    url: string
    query?: Record<string, any>
    hash?: string
  },
  options?: StringifyOptions,
) {
  let query = queryString.stringify(object.query ?? {}, options)
  if (query) query = `?${query}`

  const hash = object.hash ? `#${encodeURIComponent(object.hash)}` : ''

  return `${object.url}${query}${hash}`
}
