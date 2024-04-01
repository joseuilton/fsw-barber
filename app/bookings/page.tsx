"use client";
import { Header } from "../_components/Header/header";
import { useRouter } from "next/navigation";
import { db } from "../_lib/prisma";
import { Prisma } from "@prisma/client";
import { BookingItem } from "../_components/BookingItem/bookingItem";
import { useSession } from "next-auth/react";
import { BookingItemSheet } from "../_components/BookingItem/bookingItemSheet";
import { useEffect, useState } from "react";
import { listConfirmedBookings } from "../_actions/list-confirmed-bookings";
import { listFinishedBookings } from "../_actions/list-finished-bookings";
import { Card, CardContent } from "../_components/ui/card";
import { BarbershopMap } from "../_components/barbershopMap/barbershopMap";
import { Separator } from "../_components/ui/separator";
import { Loader2, SmartphoneIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Badge } from "../_components/ui/badge";
import { BookingInfo } from "../_components/BookingInfo/booking-info";
import { isFuture, set } from "date-fns";
import { cancelBooking } from "../_actions/cancel-booking";

type Booking = Prisma.BookingGetPayload<{
  include: {
    service: true,
    barbershop: true
  }
}>;

function BookingsPage() {
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);
  const [finishedBookings, setFinishedBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCancelBookingLoading, setIsCancelBookingLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const BookingItemComponent = isMobile ? BookingItemSheet : BookingItem;

  if (session.status === "unauthenticated") {
    router.push("/");
  }

  useEffect(() => {
    async function fetchData() {
      if (!session.data?.user) return;

      const [fetchedConfirmedBookings, fetchedFinishedBookings] = await Promise.all([
        listConfirmedBookings((session.data?.user as any).id),
        listFinishedBookings((session.data?.user as any).id),
      ]);

      setConfirmedBookings(fetchedConfirmedBookings);
      setFinishedBookings(fetchedFinishedBookings);
    }
    fetchData();
  }, [session.data?.user]);

  async function handleCancelBooking(bookingId: string) {
    setIsCancelBookingLoading(true);

    await cancelBooking(bookingId);

    setSelectedBooking(null);
    setConfirmedBookings((prevState) => prevState.filter((booking) => booking.id !== bookingId));
    setIsCancelBookingLoading(false);
  }

  return (
    <>
      <Header variant="withSearch" />

      <main className="container mx-auto py-6 px-5 lg:py-10">
        <h1 className="text-xl font-bold lg:text-2xl">Agendamentos</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
          <div className="lg:col-span-1">

            <div className="my-6">
              {confirmedBookings.length > 0 && (
                <>
                  <h2 className="font-bold text-[#838896] text-xs uppercase mb-3">Confirmados</h2>

                  <div className="flex flex-col gap-3">
                    {confirmedBookings.map((booking: Booking) => (
                      <div key={booking.id} onClick={() => setSelectedBooking(booking)}>
                        <BookingItemComponent
                          booking={booking}
                        />
                      </div>
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
                      <div key={booking.id} onClick={() => setSelectedBooking(booking)}>
                        <BookingItemComponent
                          booking={booking}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {(!isMobile && selectedBooking) && (
              <Card className="border-transparent">
                <CardContent className="flex flex-col gap-5 p-5">
                  <BarbershopMap barbershop={selectedBooking.barbershop} />

                  <div>
                    <h2 className="text-sm font-bold uppercase">Sobre nós</h2>
                    <p className="mt-2.5 text-sm text-[#838896]">
                      Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.
                    </p>
                  </div>

                  <Separator />

                  <ul className="flex flex-col gap-2.5">
                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5 text-sm">
                        <SmartphoneIcon size={24} />
                        (11) 98204-5108
                      </div>

                      <Button variant={"secondary"}>
                        Copiar
                      </Button>
                    </li>

                    <li className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5 text-sm">
                        <SmartphoneIcon size={24} />
                        (11) 98204-5108
                      </div>

                      <Button variant={"secondary"}>
                        Copiar
                      </Button>
                    </li>
                  </ul>

                  <Separator />

                  <div>
                    <Badge variant={isFuture(selectedBooking.date) ? "default" : "secondary"}>
                      {isFuture(selectedBooking.date) ? "Confirmado" : "Finalizado"}
                    </Badge>

                    <div className="mt-3">
                      <BookingInfo booking={selectedBooking} />
                    </div>
                  </div>

                  {isFuture(selectedBooking.date) && (
                    <Button
                      variant={"destructive"}
                      disabled={isCancelBookingLoading}
                      onClick={() => handleCancelBooking(selectedBooking.id)}
                    >
                      {isCancelBookingLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                      Cancelar reserva
                    </Button>
                  )}

                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default BookingsPage;