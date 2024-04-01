"use server";

import { db } from "../_lib/prisma";

export async function listConfirmedBookings(userId: string) {
  const response = await db.booking.findMany({
    where: {
      userId,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: true,
      barbershop: true
    }
  });

  return response;
}