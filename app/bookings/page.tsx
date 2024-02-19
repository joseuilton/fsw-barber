import { getServerSession } from "next-auth";
import { Header } from "../_components/Header/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { isFuture, isPast } from "date-fns";
import { Booking } from "@prisma/client";
import { BookingItem } from "../_components/BookingItem/bookingItem";

async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
    return;
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id
    },
    include: {
      barbershop: true,
      service: true
    }
  })

  const confirmedBookings = bookings.filter((booking: Booking) => isFuture(booking.date));
  const finishedBookings = bookings.filter((booking: Booking) => isPast(booking.date));


  return (
    <>
      <Header />

      <main className="py-6 px-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="my-6">
          <h2 className="font-bold text-[#838896] text-xs uppercase mb-3">Confirmados</h2>

          <div className="flex flex-col gap-3">
            {confirmedBookings.map((booking: Booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-[#838896] text-xs uppercase mb-3">Finalizados</h2>

          <div className="flex flex-col gap-3">
            {finishedBookings.map((booking: Booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default BookingsPage;