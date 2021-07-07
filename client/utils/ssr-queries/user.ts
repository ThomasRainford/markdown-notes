export const USER_QUERY = `
query User($username: String!) {
   user(username: $username) {
      id
      username
      email
      following
      followers
      upvoted
   }
 }
`