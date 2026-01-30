import { cn } from "@/lib/utils"

export function AvatarGroup() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&auto=format&fit=crop&q=80",
  ]

  return (
    <div className="flex items-center -space-x-2">
      {avatars.map((src, i) => (
        <div
          key={i}
          className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-background ring-2 ring-background/50 hover:z-10 hover:-translate-y-1 transition-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`User ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-zinc-800 text-[10px] font-bold text-white ring-2 ring-background/50 z-0">
        +500
      </div>
    </div>
  )
}
