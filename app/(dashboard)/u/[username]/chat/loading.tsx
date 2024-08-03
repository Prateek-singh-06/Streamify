import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/togglecard";
const ChatLoading = () => {
  return (
    <div>
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
      </div>
    </div>
  );
};

export default ChatLoading;
