export function validateUrl (url) {
  const givenUrl = new URL(url)
  return givenUrl.protocol !== 'http:' && givenUrl.protocol !== 'https:'
}
