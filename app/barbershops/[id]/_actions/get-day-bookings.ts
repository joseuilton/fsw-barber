"use server";

import { endOfDay, startOfDay } from "date-fns";

import { db } from "@/app/_lib/prisma";

interface GetDayBookingsParams {
  serviceId: string;
  date: Date;
}

export async function getDayBookings({ serviceId, date }: GetDayBookingsParams) {
  const bookings = await db.booking.findMany({
    where: {
      serviceId: serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    },
    select: {
      date: true
    }
  });

  return bookings;
}
