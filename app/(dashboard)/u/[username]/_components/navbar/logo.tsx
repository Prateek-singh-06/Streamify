import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75">
        <div className=" bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink ">
          <Image
            src="/LiveStream.svg"
            alt="Livestream"
            height="50"
            width="50"
          />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold">LiveStream</p>
          <p className="text-sm text-muted-foreground">Creator dashboard</p>
        </div>
      </div>
    </Link>
  );
};
