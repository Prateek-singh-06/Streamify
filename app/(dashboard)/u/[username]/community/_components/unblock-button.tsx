"use client";

import { onUnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast, Toaster } from "sonner";

interface UnblockButtonProps {
  userId: string;
}
export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransitionn] = useTransition();
  const onClick = () => {
    startTransitionn(() => {
      onUnBlock(userId)
        .then((result) => {
          toast.success(`User ${result.blocked.username} unblocked`);
        })
        .catch(() => toast.error("something went wrong"));
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
