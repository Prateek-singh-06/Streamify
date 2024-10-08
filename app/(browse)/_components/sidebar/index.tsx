import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton, Recommended } from "./recommended";
import { getRecommended } from "@/lib/recommended-service";
import { getFollowedUsers } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";
export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  console.log(following);
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 sm:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] sm:w-60 h-full bg-[#1e1f24]   border-r border-[#2D2E35]z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
