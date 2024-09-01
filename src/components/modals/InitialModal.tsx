"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
// importing ui component
import ErrorWrapper from "@/components/Animation/ErrorWrapper";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { InitialServerSchema } from "@/DataSchema/server";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DropZoneFile from "@/components/DropZoneFile";

const InitialModal = () => {
  const form = useForm<z.infer<typeof InitialServerSchema>>({
    resolver: zodResolver(InitialServerSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;
  const onSubmit = (data: z.infer<typeof InitialServerSchema>) => {
    console.log("function called");
    console.log(data);
  };

  return (
    <Dialog open>
      <DialogContent className="dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-light">
            Create a new server
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Give your server a personality with a name and an image. You can
            always change later!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="imageUrl"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <DropZoneFile
                        value={field.value}
                        onChange={field.onChange}
                        endPoint="serverImage"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={control}
              name="name"
              render={(field) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-teal-300 font-light text-base">
                      server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="server name"
                        type="text"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <ErrorWrapper>
                      <FormMessage />
                    </ErrorWrapper>
                  </FormItem>
                );
              }}
            />
          </form>
          <DialogFooter>
            <Button variant="primary" className="w-full" type="submit">
              Create
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
