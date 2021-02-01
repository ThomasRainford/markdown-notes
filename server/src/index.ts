import { MikroORM } from '@mikro-orm/core'
import { ApolloServer } from "apollo-server-express"
import connectRedis from 'connect-redis'
import cors from 'cors'
import 'dotenv-safe/config'
import express from "express"
import session from 'express-session'
import Redis from 'ioredis'
import 'reflect-metadata'
import { buildSchema } from "type-graphql"
import { COOKIE_NAME, __prod__ } from './constants'
import ormConfig from './mikro-orm.config'
import { UserResolver } from "./resolvers/user"
import { OrmContext } from './types/types'

const main = async () => {

   const orm = await MikroORM.init(ormConfig)

   const app = express()

   const RedisStore = connectRedis(session)
   const redis = new Redis()

   app.use(
      cors({
         origin: process.env.CORS_ORIGIN,
         credentials: true,
      })
   )

   app.use(
      session({
         name: COOKIE_NAME,
         store: new RedisStore({
            client: redis,
            disableTTL: true,
            disableTouch: true
         }),
         cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: "lax", // csrf
            secure: __prod__, // cookie only works in https
         },
         saveUninitialized: false,
         secret: process.env.SESSION_SECRET,
         resave: false,
      })
   )

   const apolloServer = new ApolloServer({
      schema: await buildSchema({
         resolvers: [UserResolver],
         validate: false
      }),
      context: ({ req, res }: never): OrmContext => ({
         em: orm.em,
         req,
         res,
         redis,
      })
   })

   apolloServer.applyMiddleware({
      app,
      cors: false
   })

   const port = process.env.PORT || 3000
   app.listen(port, () => {
      console.log(`Server started on port ${port}.`)
      console.log(`Visit 'http://localhost:${port}/graphql' to access GraphQL Playgorund.`)
   })

}

try {
   main()
} catch (error) {
   console.log(error)
}