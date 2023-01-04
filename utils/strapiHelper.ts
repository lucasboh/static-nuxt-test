export function getStrapiMedia (url: string): string {
  // Check if URL is a local path
  if (url?.startsWith('/')) {
    // Prepend Strapi address
    return `${useRuntimeConfig().STRAPI_URL}${url}`
  }

  // Otherwise return full URL
  return url
}

export function prepareHTML (html: string, viewportWidth: number): string {
  if (!html) {
    return
  }

  html = html.replace(/width="([^"]+)"/g, 'width="100%"')
  html = html.replace(/(<iframe[^>]*)height="([^"]+)"/g, '$1height="auto" style="aspect-ratio: 16 / 9;"')
  html = html.replace(/(<img[^>]*)height="([^"]+)"/g, '$1height="auto"')

  // handle responsive images
  html = html.replace(/(\/)+(uploads\/)/g, `${useRuntimeConfig().STRAPI_URL}/$2`) || ''

  const breakpoints = {
    xlarge: 1919,
    large: 1000,
    medium: 750,
    small: 500,
    thumbnail: 245,
  }

  if (viewportWidth <= breakpoints.small * 1.15) {
    html = html.replace(/(\/)+(uploads\/)(xlarge|large|medium)/g, `/$2small`) || ''
  }
  else if ((breakpoints.small * 1.15) < viewportWidth && viewportWidth <= (breakpoints.medium * 1.15)) {
    html = html.replace(/(\/)+(uploads\/)(xlarge|large)/g, `/$2medium`) || ''
  }
  else if ((breakpoints.medium * 1.15) < viewportWidth && viewportWidth <= (breakpoints.large * 1.15)) {
    html = html.replace(/(\/)+(uploads\/)(xlarge)/g, `/$large`) || ''
  }

  return html
}
