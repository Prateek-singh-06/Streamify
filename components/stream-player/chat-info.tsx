import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../hint";
interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersonly: boolean;
}
export const ChatInfo = ({ isDelayed, isFollowersonly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersonly && !isDelayed) {
      return "Only followers can chat";
    }
    if (isDelayed && !isFollowersonly) {
      return "Messages are delayed by 3 seconds";
    }
    if (isDelayed && isFollowersonly) {
      return "Only followers can chat. Message are delayed by 3 seconds";
    }
    return "";
  }, [isDelayed, isFollowersonly]);

  const label = useMemo(() => {
    if (isFollowersonly && !isDelayed) {
      return "Followers only";
    }
    if (isDelayed && !isFollowersonly) {
      return "Slow mode";
    }
    if (isDelayed && isFollowersonly) {
      return "Followers only and slow mode";
    }
    return "";
  }, [isDelayed, isFollowersonly]);

  if (!isDelayed && !isFollowersonly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
