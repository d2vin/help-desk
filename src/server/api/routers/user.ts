import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany()
  })
})