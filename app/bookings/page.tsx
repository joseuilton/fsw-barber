import { getServerSession } from "next-auth";
import { Header } from "../_components/Header/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { Booking } from "@prisma/client";
import { BookingItem } from "../_components/BookingItem/bookingItem";
import { authOptions } from "../_lib/auth";

async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
    return;
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      }
    }),

    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      }
    })
  ]);

  return (
    <>
      <Header />

      <main className="py-6 px-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="my-6">
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="font-bold text-[#838896] text-xs uppercase mb-3">Confirmados</h2>

              <div className="flex flex-col gap-3">
                {confirmedBookings.map((booking: Booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>

          )}

        </div>

        <div>
          {finishedBookings.length > 0 && (
            <>
              <h2 className="font-bold text-[#838896] text-xs uppercase mb-3">Finalizados</h2>

              <div className="flex flex-col gap-3">
                {finishedBookings.map((booking: Booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default BookingsPage;