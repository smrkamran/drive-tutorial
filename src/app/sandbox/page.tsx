import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";
          const res1 = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );
          const res2 =await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 5000,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );
          console.log(res1, res2);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
