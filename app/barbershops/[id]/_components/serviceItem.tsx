"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/app/_components/ui/sheet";
import { Service, User } from "@prisma/client";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker";
import { getListHours } from "../_utils/hours";
import { saveBooking } from "../_actions/save-booking";

interface ServiceItemProps {
  service: Service;
  barbershopName: string;
  user: User | undefined;
}

function CustomCaption(props: CaptionProps) {
  const { goToMonth, previousMonth, nextMonth } = useNavigation();

  return (
    <header className="flex justify-between items-center">
      <h3 className="text-base font-bold capitalize">
        {format(props.displayMonth, "MMMM", {
          locale: ptBR
        })}
      </h3>
      <div className="flex gap-3">
        <Button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="w-[28px] h-[28px] p-1.5"
          variant={"outline"}
        >
          <ChevronLeftIcon size={16} />
        </Button>
        <Button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className="w-[28px] h-[28px] p-1.5"
          variant={"outline"}
        >
          <ChevronRightIcon size={16} />
        </Button>
      </div>
    </header>
  )
}

function ServiceItem({ service, user, barbershopName }: ServiceItemProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedHour, setSelectedHour] = useState<string | undefined>();
  const [isLoadingBooking, setIsLoadingBooking] = useState<boolean>(false);

  const hoursList = useMemo(() => {
    if (!selectedDate) return [];

    return getListHours("09:00", "21:00", 45);
  }, [selectedDate])

  async function handleReservation() {
    if (!user) {
      await signIn("google")
    }
  }

  function handleSelectDate(date: Date | undefined) {
    setSelectedDate(date);
    setSelectedHour(undefined);
  }

  async function handleBooking() {
    if (!selectedDate || !selectedHour) return;

    setIsLoadingBooking(true);

    const timeSplit = selectedHour.split(":");

    await saveBooking({
        userId: user.id,
        barbershopId: service.barbershopId,
        serviceId: service.id,
        date: setMinutes(setHours(selectedDate, Number(timeSplit[0])), Number(timeSplit[1]))
    });

    setIsLoadingBooking(false);
  }

  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative max-w-[110px] min-w-[110px] min-h-[110px] max-h-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            style={{
              objectFit: "cover"
            }}
          />
        </div>

        <div>
          <h2 className="text-sm font-bold mb-1">{service.name}</h2>
          <p className="text-sm text-[#838896] mb-2.5">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-primary font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(service.price)}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" onClick={handleReservation}>
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="w-11/12 p-0 border-0 overflow-y-auto">
                <SheetHeader
                  className="px-5 py-6 text-left border-b border-solid border-secondary"
                >
                  <h2 className="text-lg font-bold">Fazer reserva</h2>
                </SheetHeader>

                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    locale={ptBR}
                    fromDate={new Date()}
                    components={{
                      Caption: CustomCaption
                    }}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize"
                      },
                      cell: {
                        width: "100%",
                        background: "transparent"
                      },
                      button: {
                        width: "36px",
                        height: "36px",
                        borderRadius: "99px"
                      },
                    }}
                    className="px-5 my-6"
                  />

                  {selectedDate && (
                    <div
                      className={
                        `flex gap-3 items-center flex-nowrap overflow-x-auto py-6 
                                                pl-5 border-y border-solid border-secondary
                                                [&::-webkit-scrollbar]:hidden`
                      }
                    >
                      {hoursList.map((hour) => (
                        <Button
                          key={hour}
                          className="text-sm px-4 py-2 rounded-full"
                          variant={selectedHour === hour ? "default" : "outline"}
                          onClick={() => setSelectedHour(hour)}
                        >
                          {hour}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="px-5 py-6">
                    <Card className="">
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="w-full flex justify-between items-center">
                          <h2 className="text-base font-bold">{service.name}</h2>
                          <h3 className="text-sm font-bold">{
                            Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL"
                            }).format(service.price)
                          }</h3>
                        </div>

                        {selectedDate && (
                          <div className="w-full flex justify-between items-center">
                            <h3 className="text-sm text-gray-400">Data</h3>
                            <p className="text-sm">
                              {format(selectedDate, "dd' de 'MMMM", {
                                locale: ptBR
                              })}
                            </p>
                          </div>
                        )}

                        {selectedHour && (
                          <div className="w-full flex justify-between items-center">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <p className="text-sm">{selectedHour}</p>
                          </div>
                        )}

                        <div className="w-full flex justify-between items-center">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <p className="text-sm">{barbershopName}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <SheetFooter className="px-5 pb-6">
                  <Button
                    disabled={!selectedDate || !selectedHour || isLoadingBooking}
                    className="py-2 text-sm font-bold"
                    onClick={handleBooking}
                  >
                    { isLoadingBooking && <Loader2 className="mr-2 w-4 h-4 animate-spin"/>}
                    Confirmar
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ServiceItem };
