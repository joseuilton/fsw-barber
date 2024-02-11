"use server";

import { db } from "@/app/_lib/prisma";

interface SaveBookingParams {
    userId: string;
    barbershopId: string;
    serviceId: string;
    date: Date;
}

export async function saveBooking({ userId, barbershopId, serviceId, date }: SaveBookingParams) {
    const booking = await db.booking.create({
        data: {
            date,
            userId,
            barbershopId,
            serviceId
        }
    })

    return booking;
}