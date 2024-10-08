"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecomendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}
export const Recommended = ({ data }: RecomendedProps) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4 ">
          <p className="text-sm text-muted-foreground ">Recommended</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((user, key) => {
          return (
            <li key={key}>
              <UserItem
                key={user.id}
                username={user.username}
                imageUrl={user.imageUrl}
                isLive={user.stream?.isLive}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      <UserItemSkeleton key={0} />
      <UserItemSkeleton key={1} />
      <UserItemSkeleton key={2} />
      <UserItemSkeleton key={3} />
      <UserItemSkeleton key={4} />
      {/* {Array(3).map((_, i) => {
        return <UserItemSkeleton key={i} />;
      })} */}
    </ul>
  );
};
