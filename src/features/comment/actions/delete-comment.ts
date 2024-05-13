"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";
import { isOwner } from "@/utils/is-owner";

export const deleteComment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment || !isOwner(user, comment)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(id));

  return toActionState("SUCCESS", "Comment deleted");
};
