"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "../components/ui/use-toast";
import { api } from "~/trpc/react";

const formSchema = z.object({
  status: z.string({
    required_error: "Select ticket status",
  }),
});

interface StatusFormProps {
  ticketId: number;
}

const StatusForm: React.FC<StatusFormProps> = ({ ticketId }) => {
  const router = useRouter();

  const updateTicketStatus = api.ticket.updateStatus.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    updateTicketStatus.mutate({ ticketId: ticketId, newStatus: values.status });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Progress">Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-neutral-900" type="submit">
          Update status
        </Button>
      </form>
    </Form>
  );
};

export default StatusForm;
