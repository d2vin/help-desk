import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z
          .string()
          .min(1, { message: "This field has to be filled." })
          .email("This is not a valid email."),
        description: z.string().min(1),
        recipientId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.ticket.create({
        data: {
          name: input.name,
          email: input.email,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
          recipient: { connect: { id: input.recipientId } },
        },
      });
    }),

  getInboundTickets: protectedProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      orderBy: { createdAt: "desc" },
      where: { recipient: { id: ctx.session.user.id } },
    });
  }),

  getTickets: protectedProcedure.query(({ ctx }) => {
    return ctx.db.ticket.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getTicketById: protectedProcedure
    .input(
      z.object({
        ticketId: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Find the ticket by ID
      const ticket = await ctx.db.ticket.findUnique({
        where: { id: input.ticketId },
      });

      if (!ticket) {
        throw new Error("Ticket not found"); // Handle this error as needed
      }

      return ticket;
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        ticketId: z.number().min(1),
        newStatus: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Find the ticket by ID
      const ticket = await ctx.db.ticket.findUnique({
        where: { id: input.ticketId },
      });

      if (!ticket) {
        throw new Error("Ticket not found"); // Handle this error as needed
      }

      // Update the status of the ticket
      return ctx.db.ticket.update({
        where: { id: input.ticketId },
        data: { status: input.newStatus },
      });
    }),
});
