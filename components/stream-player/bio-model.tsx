"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Hint } from "../hint";
import { Textarea } from "../ui/textarea";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
interface BioModelProps {
  initialValue: string | null;
}

export const BioModel = ({ initialValue }: BioModelProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="resize-none"
            disabled={isPending}
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost">
                {" "}
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isPending} type="submit" variant="pirmary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
