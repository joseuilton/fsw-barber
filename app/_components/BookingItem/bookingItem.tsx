"use client";

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const isConfirmedBooking = isFuture(booking.date);

  return (
    <Card className="w-full cursor-pointer">
      <CardContent className="px-0 py-0 flex">
        <div className="p-3 grow">
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
              <AvatarFallback className="text-sm">{booking.barbershop.name}</AvatarFallback>
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
  )
}
