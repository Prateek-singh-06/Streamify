"use client";
import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
interface ActionsProps {
  isFollowing: boolean;
  isBlocked: boolean;
  userid: string;
}

export const Actions = ({ isFollowing, userid, isBlocked }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userid)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleunFollow = () => {
    startTransition(() => {
      onUnfollow(userid)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const onClickfollow = () => {
    // console.log("unfollow");
    if (isFollowing) {
      handleunFollow();
    } else {
      handleFollow();
    }
  };
  const handleunblock = () => {
    startTransition(() => {
      onUnBlock(userid)
        .then((data) => toast.success(`You unblocked ${data.blocked.username}`))
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  const handleblock = () => {
    startTransition(() => {
      onBlock(userid)
        .then((data) => {
          toast.success(`You Blocked ${userid}`);
        })
        .catch((error) => {
          toast.error(error);
        });
    });
  };
  const onClickblock = () => {
    if (isBlocked) {
      handleunblock();
    } else {
      handleblock();
    }
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClickfollow} variant={"pirmary"}>
        {isFollowing ? "UnFollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={onClickblock} variant={"pirmary"}>
        {isBlocked ? "Unblock" : "block"}
      </Button>
    </>
  );
};
