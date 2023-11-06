import Link from "next/link";

import TicketForm from "~/components/ticket-form";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col bg-neutral-950">
      <div className="px-6 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {session ? "Sign out" : "Sign in to get started"}
            </Link>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const users = await api.user.getUsers.query();

  return (
    <div className="mt-4 w-full max-w-xs rounded-lg bg-neutral-900 p-4 space-y-2">
      <h1 className="text-white w-full flex justify-center text-xl font-medium">Use this form to report a ticket</h1>
      <TicketForm users={users} />
    </div>
  );
}
