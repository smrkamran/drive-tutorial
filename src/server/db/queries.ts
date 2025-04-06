import "server-only";

import { and, eq, isNull } from "drizzle-orm";
import { db } from "~/server/db";
import {
  DB_FileType,
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
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
  },

  getFiles: function (parsedFolderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, parsedFolderId))
      .orderBy(filesSchema.id);
  },

  getFolders: function (parsedFolderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, parsedFolderId))
      .orderBy(foldersSchema.id);
  },

  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId));
    return folder[0];
  },

  getRootFolderForUser: async function (userId: string) {
    const rootFolder = await db
      .select()
      .from(foldersSchema)
      .where(
        and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)),
      );
    return rootFolder[0];
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db
      .insert(filesSchema)
      .values({ ...input.file, ownerId: input.userId });
  },

  onBoardUser: async function (userId: string) {
    const rootFolder = await db
      .insert(foldersSchema)
      .values({
        name: "Root",
        ownerId: userId,
        parent: null,
      })
      .$returningId();

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: "Trash",
        ownerId: userId,
        parent: rootFolderId,
      },
      {
        name: "Shared",
        ownerId: userId,
        parent: rootFolderId,
      },
      {
        name: "Documents",
        ownerId: userId,
        parent: rootFolderId,
      },
    ]);

    return rootFolderId;
  },
};
