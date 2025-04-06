import { Cloud } from "lucide-react";

export default function Home(props: { children: React.ReactNode }) {
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
        {props.children}
      </main>
      <footer className="px-6 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CloudDrive. All rights reserved.</p>
      </footer>
    </div>
  );
}
