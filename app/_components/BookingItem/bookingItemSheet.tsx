"use client";
import { cancelBooking } from "@/app/_actions/cancel-booking";
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ptBR } from "date-fns/locale";
import { BarbershopMap } from "../barbershopMap/barbershopMap";
import { BookingInfo } from "../BookingInfo/booking-info";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BookingItem } from "./bookingItem";

interface BookingItemSheetProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

export function BookingItemSheet({ booking }: BookingItemSheetProps) {
  const [isCancelBookingLoading, setIsCancelBookingLoading] = useState(false);
  const isConfirmedBooking = isFuture(booking.date);

  async function handleCancelBookingClick() {
    setIsCancelBookingLoading(true);

    await cancelBooking(booking.id);

    setIsCancelBookingLoading(false);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <BookingItem booking={booking} />
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 border-none w-11/12 overflow-y-auto">
        <SheetHeader className="px-5 py-6 border-b border-solid border-secondary text-left">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="mt-6 px-5">
          <BarbershopMap barbershop={booking.barbershop} />

          <div className="my-6">
            <Badge variant={isConfirmedBooking ? "default" : "secondary"}>
              {isConfirmedBooking ? "Confirmado" : "Finalizado"}
            </Badge>

            <div className="mt-3">
              <BookingInfo booking={booking} />
            </div>
          </div>

          {isConfirmedBooking && (
            <div className="flex gap-3 mb-6">
              <SheetClose className="w-full" asChild>
                <Button variant="secondary">Voltar</Button>
              </SheetClose>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="border-none rounded-2xl w-4/5 p-5">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold text-base">
                      Cancelar Reserva
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                      Tem certeza que deseja cancelar esse agendamento?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="flex flex-row items-center gap-2.5 mt-5">
                    <AlertDialogCancel className="w-full m-0">Voltar</AlertDialogCancel>

                    <AlertDialogAction
                      disabled={isCancelBookingLoading}
                      className="w-full"
                      onClick={handleCancelBookingClick}
                    >
                      {isCancelBookingLoading && (
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      )}
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}