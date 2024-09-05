"use client";
import { Follow, User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import { UserItem } from "./user-item";
import { UserItemSkeleton } from "./user-item";

interface followingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}
export const Following = ({ data }: followingProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4 ">
          <p className="text-sm text-muted-foreground ">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow, key) => {
          return (
            <li key={key}>
              <UserItem
                key={follow.following.id}
                username={follow.following.username}
                imageUrl={follow.following.imageUrl}
                isLive={follow.following.stream?.isLive}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 sm:pt-0">
      <UserItemSkeleton key={0} />
      <UserItemSkeleton key={1} />
      <UserItemSkeleton key={2} />
    </ul>
  );
};
