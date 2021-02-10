export const COLLECTIONS_QUERY = `
query {
   collections {
      id
      title
      visibility
      upvotes
      createdAt
   }
}`