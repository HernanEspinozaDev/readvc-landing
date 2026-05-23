import { cn } from "@/lib/utils";

export function Spotlight({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px] -z-10",
        className
      )}
    />
  );
}
