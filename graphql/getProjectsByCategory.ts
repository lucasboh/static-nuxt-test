const query = (id, locale) =>
`query {
  subcategories (locale: "${locale}") {
    data {
      id
      attributes {
        name
      }
    }
  }
  category (id: "${id}", locale: "${locale}") {
    data {
      attributes {
        projects {
          data {
            attributes {
              name
              slug
              subcategory {
                data {
                  id
                }
              }
              category {
                data {
                  id
                  attributes {
                    name
                  }
                }
              }
              cover {
                data {
                  attributes {
                    formats
                    alternativeText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

export default query
