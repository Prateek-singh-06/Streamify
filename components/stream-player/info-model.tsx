"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  useState,
  useRef,
  ElementRef,
  useTransition,
  ReactElement,
} from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModelProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}
export const InfoModel = ({
  initialThumbnailUrl,
  initialName,
}: InfoModelProps) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: name })
        .then(() => toast.success("stream updated"))
        .then(() => closeRef?.current?.click())
        .catch(() => toast.error("something went wrong"));
    });
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail Removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("something went wrong"));
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2 ">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-sx overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFF",
                      cursor: "pointer",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="ghost">
                Cancle
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="pirmary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
