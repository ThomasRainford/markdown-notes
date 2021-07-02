export const PUBLICNOTES_QUERY = `
query {
   publicNotes(username: "TestUser") {
     id
       title
       visibility
       upvotes
       lists {
          id
          title
          collection {
             id
             title
             visibility
          }
          notes {
             id
             title
             body
          }
       }
       createdAt
   }
 }`