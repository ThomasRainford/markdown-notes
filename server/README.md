# GraphQL-TypeScript Server Starter

Lightweight boilerplate for a GraphQL TypeScript server for MongoDB databases with basic user functionality included.

## Features

-  Type-GraphQL.
-  Mikro-Orm with MongoDB.
-  GraphQL schema and ORM entities can be defined in the same class!
-  Apollo server as the GraphQL server.
-  Redis cache for user cookies.
-  Generate enviroment variable types with gen-env-types.

### TypeScript Features

-  Continously watches .ts files for changes and converts them to JavaScript in a seperate file.
-  Uses nodemon to run the index.js file.
-  ESLint with recommended linting rules for TypeScript.
-  VSCode setting for running linting command when a file is saved.

## Getting Started

### Step 1: Clone the repo.

```bash
$ git clone https://github.com/ThomasRainford/graphql-typescript-server-starter.git
$ cd graphql-typescript-server-starter
```

### Step 2: Install the dependencies using yarn.

```bash
$ yarn
```

### Step 3: Add a _.env_ file<br><br>

You will need to add an _.env_ file which includes the enviroment variables found in the _.env.example_ file.

You will also need to have a MongoDB username and password, and you will need to create a new DB and add the host name.

### <br>Step 4: Watch the .ts files.

```bash
$ yarn watch
```

### Step 5: Launch in dev mode.

```bash
$ yarn dev
```

The .ts files will be compiled to JavaScript and placed in the dist directory. Nodemon will then run the project using the index.js file.

**Note:** Step 3 and step 4 will need to be run in seperate terminals.

### Step 6: Open GraphQL Playground

Go to the URL displayed in the console. i.e http://localhost:3000/graphql

### Step 7: Test the User queries and mutations

**Note:** You will have to run the register mutation first.

**Queries:**

User:me

```graphql
query {
	me {
		_id
		email
		username
	}
}
```

User:login

```graphql
query Login($usernameOrEmail: String!, $password: String!) {
	login(usernameOrEmail: $usernameOrEmail, password: $password) {
		user {
			_id
			email
			username
		}
		errors {
			field
			message
		}
	}
}
```

User:logout

```graphql
query {
	logout
}
```

**Mutations:**

User:register

```graphql
mutation Register($registerInput: UserRegisterInput!) {
	register(registerInput: $registerInput) {
		user {
			_id
			email
			username
		}
		errors {
			field
			message
		}
	}
}
```

User:updateUser

```graphql
mutation UpdateUser($username: String!, $password: String!) {
	updateUser(username: $username, password: $password) {
		user {
			_id
			email
			username
		}
		errors {
			field
			message
		}
	}
}
```

## Next Steps:

-  Once all queries and mutations work you're good to go.
-  Note that the user functionality can be used or removed, it's up to you.
-  Checkout all scripts below.
-  Feel free to open issues.

## All Scripts:

-  `yarn build` -- Compiles the .ts files into JavaScript.
-  `yarn watch` -- Watches the .ts files and compiles them into JavaScript.
-  `yarn dev` -- Runs the project in developer mode. This means any changes made will automatically re-run the typescript code.
-  `yarn start` -- Runs the project using Node instead of nodemon.
-  `yarn lint` -- Runs ESLint
-  `yarn gen-env-types` -- Takes the .env file and generates a .d.ts file of the types for each variable.
