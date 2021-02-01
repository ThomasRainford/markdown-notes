import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { Request, Response } from 'express'
import { ObjectId } from "@mikro-orm/mongodb"
import { Redis } from "ioredis"

export type OrmContext = {
   em: EntityManager<IDatabaseDriver<Connection>>
   req: Request & { session: { userId: ObjectId | undefined } },
   res: Response,
   redis: Redis
}