"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToFormState,
  toFormState,
} from "@/components/form/utils/to-form-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

export const deleteComment = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    await prisma.comment.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  revalidatePath(ticketPath(id));

  return toFormState("SUCCESS", "Comment deleted");
};
