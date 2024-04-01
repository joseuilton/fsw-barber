"use server";

import { db } from "../_lib/prisma";

export async function listFinishedBookings(userId: string) {

  const response = await db.booking.findMany({
    where: {
      userId,
      date: {
        lt: new Date()
      }
    },
    include: {
      service: true,
      barbershop: true
    }
  });

  return response;
}