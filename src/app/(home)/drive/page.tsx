import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";
import { QUERIES, MUTATIONS } from "~/server/db/queries";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <form
        action={async () => {
          "use server";
          const session = await auth();
          if (!session.userId) {
            return redirect("/sign-in");
          }

          const rootFolderId = await MUTATIONS.onBoardUser(session.userId);
          return redirect(`/f/${rootFolderId}`);
        }}
      >
        <Button type="submit">Create New Drive</Button>
      </form>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}
