import { type Ticket } from "@prisma/client";
import Link from "next/link";
import StatusForm from "~/components/status-form";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type ProjectStatus = "Resolved" | "Progress" | "New";

const statuses: Record<ProjectStatus, string> = {
  Resolved: "text-green-700 bg-green-50 ring-green-600/20",
  Progress: "text-gray-600 bg-gray-50 ring-gray-500/10",
  New: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Inbox = async () => {
  const session = await getServerAuthSession();
  if (!session?.user)
    return (
      <div className="flex min-h-screen w-full justify-center bg-neutral-950 p-16">
        <Link href="/">
          <button className="rounded-lg bg-indigo-500 p-4 text-white hover:bg-indigo-600">
            Sign in to access inbox
          </button>
        </Link>
      </div>
    );
  const inboundTickets = await api.ticket.getInboundTickets.query();
  const tickets = await api.ticket.getTickets.query();
  const statusClassName = (project: Ticket) =>
    statuses[project.status as ProjectStatus];

  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      {/* inbound tickets */}
      <div className="mt-4 w-full rounded-lg bg-neutral-900 p-4">
        {inboundTickets ? (
          <p className="truncate text-white">
            Your inbound tickets: {inboundTickets?.length}
          </p>
        ) : (
          <p className="text-white">You have no tickets yet.</p>
        )}
      </div>
      <ul role="list" className="divide-y divide-gray-100 bg-neutral-950 p-16">
        {inboundTickets.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0 space-y-4">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-white">
                  {project.name}
                </p>
                <p
                  className={classNames(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    statusClassName(project),
                    "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  {project.status}
                </p>
              </div>
              <StatusForm ticketId={project?.id ?? 0} />
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-white">
                <p className="whitespace-nowrap">
                  Created at {JSON.stringify(project.createdAt)}
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Created by {project.createdById}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <a
                href={`https://help-desk-jet.vercel.app/tickets/${project.id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View ticket<span className="sr-only">, {project.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
      {/* outbound tickets */}
      <div className="mt-4 w-full rounded-lg bg-neutral-900 p-4">
        {tickets ? (
          <p className="truncate text-white">
            Your outbound tickets: {tickets?.length}
          </p>
        ) : (
          <p className="text-white">You have no tickets yet.</p>
        )}
      </div>
      <ul role="list" className="divide-y divide-gray-100 bg-neutral-950 p-16">
        {tickets?.map((project) => (
          <li
            key={project.id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0 space-y-4">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-white">
                  {project.name}
                </p>
                <p
                  className={classNames(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    statusClassName(project),
                    "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  )}
                >
                  {project.status}
                </p>
              </div>
              <StatusForm ticketId={project?.id ?? 0} />
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-white">
                <p className="whitespace-nowrap">
                  Created at {JSON.stringify(project.createdAt)}
                  {/* <time dateTime={project.dueDateTime}>{project.dueDate}</time> */}
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Created by {project.createdById}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <a
                href={`https://help-desk-jet.vercel.app/tickets/${project.id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View ticket<span className="sr-only">, {project.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
