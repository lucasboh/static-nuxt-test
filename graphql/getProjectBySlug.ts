const query = (slug, locale) =>
`query {
  projects (filters: {slug: {eq: "${slug}"}}, locale:"${locale}") {
    data {
      attributes {
        name
        description
        images {
          data {
            id
            attributes {
              formats
              alternativeText
            }
          }
        }
        cover {
          data {
            attributes {
              formats
            }
          }
        }
      }
    }
  }
}`

export default query
