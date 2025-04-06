import Link from "next/link";
import Image from "next/image";
import { Cloud } from "lucide-react";
import { Button } from "~/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CloudDrive</span>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Cloud storage made simple
          </h1>
          <p className="mx-auto max-w-xl text-xl text-muted-foreground">
            Store, share, and access your files from anywhere, on any device.
          </p>
          <form
            action={async () => {
              "use server";

              const session = await auth();

              if (!session.userId) {
                return redirect("/sign-in");
              }

              return redirect("/drive");
            }}
          >
            <Button
              type="submit"
              className="inline-flex h-14 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-lg font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Get Started
            </Button>
          </form>
        </div>
      </main>
      <footer className="px-6 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CloudDrive. All rights reserved.</p>
      </footer>
    </div>
  );
}
