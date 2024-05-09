"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { isOwner } from "@/utils/is-owner";

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
