"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../components/ui/use-toast";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  message: z.string().min(1, {
    message: "Reply must be at least 1 character.",
  }),
  ticketId: z.number().min(1, {
    message: "Reply must be at least 1 character.",
  }),
});

interface RepliesProps {
  ticketId: number;
}

const Replies: React.FC<RepliesProps> = ({ ticketId }) => {
  const router = useRouter();

  const createReply = api.reply.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      ticketId: ticketId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createReply.mutate(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reply</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add your reply..."
                  className="resize-none text-black"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can reply to this ticket for both parties to see
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Replies;
