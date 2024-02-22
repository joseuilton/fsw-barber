import { format } from "date-fns";
import { Card, CardContent } from "../ui/card";
import { ptBR } from "date-fns/locale";
import { Barbershop, Booking, Service } from "@prisma/client";

interface BookingInfoProps {
  booking: Partial<Pick<Booking, "date">> & {
    barbershop: Pick<Barbershop, "name">,
    service: Pick<Service, "name" | "price">
  }
}

export function BookingInfo({ booking }: BookingInfoProps) {
  return (
    <Card>
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

        {booking.date && (
          <>
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
          </>
        )}

        <div className="w-full flex justify-between items-center">
          <h3 className="text-sm text-gray-400">Barbearia</h3>
          <p className="text-sm">{booking.barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}