"use client";
import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullscreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export const FullscreenControl = ({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) => {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      {/* <Hint label={label} asChild> */}
      <button onClick={onToggle} title={label}>
        <Icon className="h-5 w-5" />
      </button>
      {/* </Hint> */}
    </div>
  );
};
