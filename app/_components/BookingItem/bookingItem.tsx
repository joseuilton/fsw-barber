"use client";

import { Booking, Prisma } from "@prisma/client"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useState } from "react"
import { cancelBooking } from "@/app/_actions/cancel-booking"
import { Loader2 } from "lucide-react"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
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
        <Card className="min-w-full">
          <CardContent className="px-0 py-0 flex">
            <div className="px-3 py-3 grow">
              <Badge variant={isConfirmedBooking ? "default" : "secondary"}>
                {isConfirmedBooking ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="mt-3 mb-2 text-base font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={booking.barbershop.imageUrl}
                    alt="Imagem da barbearia"
                    width={24}
                    height={24}
                  />
                  <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mw-[106px] px-7 border-l">
              <p className="text-xs capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR
                })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd")}
              </p>
              <p className="text-xs">
                {format(booking.date, "HH':'mm")}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-0 border-none w-11/12 overflow-y-auto">
        <SheetHeader className="px-5 py-6 border-b border-solid border-secondary text-left">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="mt-6 px-5">
          <div className="min-h-[180px] w-full relative">
            <div className="flex justify-center z-50 absolute left-0 bottom-4 w-full">
              <Card className="py-3 px-5">
                <CardContent className="p-0 flex gap-3 items-center">
                  <Avatar className="min-w-[48px] min-h-[48px]">
                    <AvatarImage src={booking.barbershop.imageUrl} />
                    <AvatarFallback>{booking.barbershop.name}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="font-bold text-base">{booking.barbershop.name}</h2>
                    <h3 className="overflow-hidden text-nowrap text-ellipsis text-xs">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Image
              src={"/barber-shop-map.png"}
              alt={booking.barbershop.name}
              fill
              style={{
                objectFit: "cover"
              }}
            />
          </div>

          <div className="my-6">
            <Badge variant={isConfirmedBooking ? "default" : "secondary"}>
              {isConfirmedBooking ? "Confirmado" : "Finalizado"}
            </Badge>

            <Card className="mt-3">
              <CardContent className="flex flex-col gap-3 p-3">
                <div className="w-full flex justify-between items-center">
                  <h2 className="text-base font-bold">{booking.service.name}</h2>
                  <h3 className="text-sm font-bold">{
                    Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(booking.service.price)
                  }</h3>
                </div>

                <div className="w-full flex justify-between items-center">
                  <h3 className="text-sm text-gray-400">Data</h3>
                  <p className="text-sm">
                    {format(booking.date, "dd' de 'MMMM", {
                      locale: ptBR
                    })}
                  </p>
                </div>

                <div className="w-full flex justify-between items-center">
                  <h3 className="text-sm text-gray-400">Horário</h3>
                  <p className="text-sm">
                    {format(booking.date, "HH':'mm")}
                  </p>
                </div>

                <div className="w-full flex justify-between items-center">
                  <h3 className="text-sm text-gray-400">Barbearia</h3>
                  <p className="text-sm">{booking.barbershop.name}</p>
                </div>
              </CardContent>
            </Card>
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
                      { isCancelBookingLoading && (
                        <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
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

export { BookingItem }
