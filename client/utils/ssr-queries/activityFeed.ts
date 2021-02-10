export const ACTIVITY_FEED_QUERY = `
query {
   activityFeed {
     activity
     collection {
       id
       title
       upvotes
       createdAt
       updatedAt
       owner {
             id
         username
       }
     }
   }
 }
`