import { MikroORM } from "@mikro-orm/core"
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter"
import { User } from "./entities/User"

export default {
   entities: [User],
   dbName: 'markdown-notes-db',
   type: 'mongo',
   clientUrl: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
   highlighter: new MongoHighlighter(),
} as Parameters<typeof MikroORM.init>[0]