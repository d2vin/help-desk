"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

const CreateTicket = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const createTicket = api.ticket.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTicket.mutate({ name });
      }}
      className="flex flex-col space-y-4 text-white"
    >
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg px-4 py-2 text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="w-full rounded-lg px-4 py-2 text-white"
          type="email"
          id="email"
          placeholder="Your Email"
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          className="w-full rounded-lg px-4 py-2 text-white"
          rows={4}
          id="description"
          placeholder="Describe the problem you are experiencing"
          required
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-indigo-500 px-10 py-3 font-semibold transition hover:bg-indigo-600"
        disabled={createTicket.isLoading}
      >
        {createTicket.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateTicket;
