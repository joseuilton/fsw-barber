"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export async function cancelBooking(id: string) {
    const deletedBooking = await db.booking.delete({
        where: {
            id: id
        }
    });

    revalidatePath("/");
    revalidatePath("/bookings");

    return deletedBooking;
}