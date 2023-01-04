const query = locale =>
`query  {
  categories (locale: "${locale}", sort: "id") {
    data {
      id
      attributes {
        name
        cover {
          data {
            attributes {
              url
              formats
            }
          }
        }
      }
    }
  }
  projects (filters: {slug: {eq: "planta-asfaltica-y-prefabricados"}}, locale:"${locale}") {
    data {
      attributes {
        name
        cover {
          data {
            attributes {
              url
              formats
            }
          }
        }
      }
    }
  }
}`

export default query
