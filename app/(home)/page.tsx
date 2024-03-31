import { format } from "date-fns";
import { Header } from "../_components/Header/header";
import { ptBR } from "date-fns/locale";
import { Search } from "./_components/search";
import { BookingItem } from "../_components/BookingItem/bookingItem";
import { db } from "../_lib/prisma"
import { BarbershopItem } from "../_components/BarbershopItem/barbershopItem";
import { Barbershop, Booking } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../_components/ui/carousel";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [confirmedBooking, barbershops] = await Promise.all([
    session?.user ? db.booking.findFirst({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        barbershop: true,
        service: true
      },
    }) : Promise.resolve(null),

    db.barbershop.findMany()
  ]);

  return (
    <div>
      <Header />

      <div className="relative lg:w-full lg:py-16">
        <Image
          src={"/hero.png"}
          alt="Hero barbearia"
          fill
          style={{ objectFit: "cover", opacity: "0.3", objectPosition: "50% 20%" }}
          className="hidden lg:block"
        />

        <div className="relative container mx-auto px-5 lg:grid lg:grid-cols-12 z-50">
          <div className="lg:col-span-4">
            <div className="py-6 lg:py-0 lg:mb-12">
              <h1 className="mb-1 text-xl font-bold lg:text-2xl">
                {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá, Faça seu login!"}
              </h1>

              <p className="capitalize text-sm">
                {format(new Date(), "EEEE',' dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>

            <Search />

            <div className="pt-9 pb-6 lg:pt-12">
              {confirmedBooking ? (
                <>
                  <h2 className="uppercase text-gray-400 text-xs font-bold mb-3 lg:mb-5">
                    Agendamentos
                  </h2>
                  <BookingItem booking={confirmedBooking} />
                </>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-32">
            <h2 className="uppercase text-gray-400 text-xs font-bold mb-3 lg:text-sm lg:mb-5">
              Recomendados
            </h2>

            <Carousel
              opts={{
                align: "start"
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-5">
                {barbershops.map((barbershop: Barbershop) => (
                  <CarouselItem key={barbershop.id} className="basis-1/2 lg:basis-5/12 pl-5">
                    <BarbershopItem barbershop={barbershop} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex -left-[25px] w-[50px] h-[50px]" />
              <CarouselNext className="hidden lg:flex -right-[25px] w-[50px] h-[50px]" />
            </Carousel>
          </div>
        </div>
      </div >

      <div className="mt-6 px-5 container mx-auto lg:mt-10">
        <h2
          className="uppercase text-gray-400 text-xs font-bold mb-3 lg:mb-5 lg:text-white
                     lg:text-xl lg:normal"
        >
          Populares
        </h2>

        <Carousel
          opts={{
            align: "start"
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {barbershops.map((barbershop: Barbershop) => (
              <CarouselItem key={barbershop.id} className="basis-1/2 lg:basis-1/5 pl-5">
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex -left-[25px] w-[50px] h-[50px]" />
          <CarouselNext className="hidden lg:flex -right-[25px] w-[50px] h-[50px]" />
        </Carousel>
      </div>

      <div className="mt-6 px-5 container mx-auto lg:mt-10">
        <h2
          className="uppercase text-gray-400 text-xs font-bold mb-3 lg:mb-5 lg:text-white
                     lg:text-xl lg:normal-case"
        >
          Mais visitados
        </h2>

        <Carousel
          opts={{
            align: "start"
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {barbershops.map((barbershop: Barbershop) => (
              <CarouselItem key={barbershop.id} className="basis-1/2 lg:basis-1/5 pl-5">
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex -left-[25px] w-[50px] h-[50px]" />
          <CarouselNext className="hidden lg:flex -right-[25px] w-[50px] h-[50px]" />
        </Carousel>
      </div>
    </div>
  );
}
