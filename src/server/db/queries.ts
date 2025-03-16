import { eq } from "drizzle-orm";
import DriveContents from "~/components/drive-contents";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

export async function getAllParentsForFolder(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;

  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent not found");
    }

    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
}

export function getFiles(parsedFolderId: number) {
  return db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
}

export function getFolders(parsedFolderId: number) {
  return db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
}
