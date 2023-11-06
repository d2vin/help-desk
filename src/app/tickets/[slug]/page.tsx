import Replies from "~/components/replies";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const Page = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  const ticketId = parseInt(params.slug, 10);
  const ticket = await api.ticket.getTicketById.query({
    ticketId: ticketId,
  });
  const replies = await api.reply.getReplies.query({
    ticketId: ticketId,
  });
  return (
    <div className="min-h-screen space-y-8 bg-neutral-950 px-8 py-16 text-white">
      <div className="rounded-lg bg-neutral-800 p-4 text-white shadow-md">
        <div className="text-xl font-bold">{ticket.name}</div>
        <div className="text-gray-400">{ticket.email}</div>
        <div className="text-gray-500">{ticket.description}</div>
        <div className="mt-2 text-gray-400">
          Created at: {new Date(ticket.createdAt).toLocaleString()}
        </div>
        <div className="text-gray-400">
          Updated at: {new Date(ticket.updatedAt).toLocaleString()}
        </div>
        <div className="text-gray-400">Status: {ticket.status}</div>
      </div>
      <div>
        {replies.map((reply) => (
          <div
            key={reply.id}
            className="mb-4 rounded-lg bg-gray-800 p-4 text-white shadow-md"
          >
            <h2 className="text-xl font-bold">Ticket Reply #{reply.id}</h2>
            <ul className="text-gray-400">
              <li>ID: {reply.id}</li>
              <li>Message: {reply.message}</li>
              <li>Ticket ID: {reply.ticketId}</li>
              <li>Created By: {reply.createdById}</li>
            </ul>
          </div>
        ))}
      </div>
      <Replies ticketId={ticketId} />
    </div>
  );
};

export default Page;
