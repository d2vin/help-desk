import Link from "next/link";

import CreateTicket from "~/components/create-ticket";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.ticket.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col bg-black">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Boost your productivity.
            <br />
            Start using HelpDesk today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
            Streamline your ticket management with our user-friendly app! Say
            goodbye to ticketing headaches and hello to effortless organization.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
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
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-indigo-500 px-10 py-3 font-semibold no-underline transition hover:bg-indigo-600"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestTicket = await api.ticket.getLatest.query();
  const users = await api.user.getUsers.query();

  return (
    <div className="w-full max-w-xs">
      {latestTicket ? (
        <p className="truncate">Your most recent ticket: {latestTicket.name}</p>
      ) : (
        <p>You have no tickets yet.</p>
      )}
      <div className="text-white max-w-md">users: {JSON.stringify(users[0])}</div>

      <CreateTicket />
    </div>
  );
}
