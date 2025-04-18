import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Search from "@/components/lib/search";
import ModeToggle from "@/components/lib/navbar/mode-toggle";
import logoImg from "@/img/logo.png";

const Navbar = () => (
  <header className="bg-background sticky top-0 z-50 flex h-16 items-center gap-4 border-b px-4 md:px-6">
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex size-10 items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image src={logoImg} alt="SuperScan logo" className="size-8" />
        <span className="sr-only">SuperScan</span>
      </Link>
      <Link
        href="/"
        className="text-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
    </nav>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            <Image src={logoImg} alt="SuperScan logo" className="size-8" />
            <span className="sr-only">SuperScan</span>
          </Link>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
    <div className="flex w-full items-start justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <Search
        className="fixed mr-14 w-5/12 sm:w-3/5 md:w-3/6 lg:w-1/3"
        shortcut
      />
      <ModeToggle />
    </div>
  </header>
);

export default Navbar;
