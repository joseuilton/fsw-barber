import { format } from "date-fns";
import { Header } from "../_components/Header/header";
import { ptBR } from "date-fns/locale";
import { Search } from "./_components/search";
import { BookingItem } from "../_components/BookingItem/bookingItem";
import { db } from "../_lib/prisma"
import { BarbershopItem } from "../_components/BarbershopItem/barbershopItem";
import { Barbershop, Booking } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [confirmedBookings, barbershops] = await Promise.all([
    session?.user ? db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        barbershop: true,
        service: true
      }
    }) : Promise.resolve([]),

    db.barbershop.findMany()
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h1 className="mb-1 text-xl font-bold">
          {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá!"}
        </h1>

        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5">
        <Search />
      </div>

      <div className="px-5 pt-9 pb-6">
        {confirmedBookings ? (
          <>
            <h2 className="uppercase text-gray-400 text-xs font-bold mb-3">Agendamentos</h2>
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking: Booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        ) : ""}
      </div>

      <div className="px-5">
        <h2 className="uppercase text-gray-400 text-xs font-bold mb-3">Recomendados</h2>

        <div className="flex gap-4 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop: Barbershop) => (
              <div className="min-w-[167px] max-w-[167px]" key={barbershop.id}>
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 px-5">
        <h2 className="uppercase text-gray-400 text-xs font-bold mb-3">Populares</h2>

        <div className="flex gap-4 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop) => (
            <div className="min-w-[167px] max-w-[167px]" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
