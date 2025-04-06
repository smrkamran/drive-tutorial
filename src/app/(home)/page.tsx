import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link href="/f/1">Go to root folder</Link>
    </div>
  );
}
