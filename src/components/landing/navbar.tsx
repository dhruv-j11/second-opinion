import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Heart className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold text-foreground">
            Second Opinion
          </span>
        </Link>

        <Button size="sm" asChild>
          <a href="#waitlist">Join waitlist</a>
        </Button>
      </div>
    </header>
  );
}
