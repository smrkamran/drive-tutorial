import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Link href="/f/2251799813685249">Go to root folder</Link>
    </div>
  );
}
