import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

interface BarbershopMapProps {
  barbershop: {
    imageUrl: string;
    name: string;
    address: string;
  }
}

export function BarbershopMap({ barbershop }: BarbershopMapProps) {
  return (
    <div className="min-h-[180px] w-full relative">
      <div className="flex justify-center z-50 absolute left-0 bottom-4 w-full">
        <Card className="mx-5 w-full">
          <CardContent className="py-3 px-5 flex gap-3 items-center">
            <Avatar className="min-w-[48px] min-h-[48px]">
              <AvatarImage src={barbershop.imageUrl} />
              <AvatarFallback>{barbershop.name}</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="font-bold text-base">{barbershop.name}</h2>
              <h3 className="overflow-hidden text-nowrap text-ellipsis text-xs">
                {barbershop.address}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Image
        src={"/barber-shop-map.png"}
        alt={barbershop.name}
        fill
        style={{
          objectFit: "cover"
        }}
        className="rounded-lg"
      />
    </div>
  )
}