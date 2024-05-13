"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/is-owner";

export const getComments = async (ticketId: string, cursor?: string) => {
  // export const getComments = async (ticketId: string, cursor?: number) => {
  const { user } = await getAuth();

  const where = {
    ticketId,
    id: {
      lt: cursor,
    },
    // createdAt: {
    //   lt: cursor ? new Date(cursor) : undefined,
    // },
  };

  const take = 2;

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = true;

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      // cursor: comments.at(-1)?.createdAt.valueOf(),
      cursor: comments.at(-1)?.id,
    },
  };
};
