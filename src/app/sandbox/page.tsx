import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default async function SandboxPage() {
  const user = await auth();
  if (!user.userId) {
    throw new Error("User not found");
  }

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));
  console.log("folders :>> ", folders);
  
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: 0,
            })
            .$returningId();

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));

          await db.insert(folders_table).values(insertableFolders);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
