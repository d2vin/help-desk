import { z } from "zod";

import { EventEmitter } from "events";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


const ee = new EventEmitter();

export const replyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        message: z.string().min(1),
        ticketId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const reply = await ctx.db.reply.create({
        data: {
          message: input.message,
          createdBy: { connect: { id: ctx.session.user.id } },
          ticket: { connect: { id: input.ticketId } },
        },
      });
      ee.emit("add", reply);
    }),

  getReplies: protectedProcedure
    .input(
      z.object({
        ticketId: z.number().min(1),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.reply.findMany({
        orderBy: { createdAt: "asc" },
        where: { ticket: { id: input.ticketId } },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
