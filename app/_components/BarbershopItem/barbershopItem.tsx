import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import Image from "next/image"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"
import { Button } from "../ui/button"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-1">
        <div className=" w-full h-[159px] relative">
          <Badge className="flex gap-1.5 items-center absolute top-1 left-1 z-50 backdrop-blur-sm bg-primary/30">
            <StarIcon className="fill-primary text-primary opacity-100" size={10} />
            <span className="text-xs font-bold">5,0</span>
          </Badge>

          <Image
            className="rounded-2xl"
            style={{
              objectFit: "cover"
            }}
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
          />
        </div>

        <div className="px-3 pb-3">
          <h2
            className="mt-2 font-bold text-base overflow-hidden text-ellipsis text-nowrap"
          >
            {barbershop.name}
          </h2>
          <h3
            className="mt-1 text-xs text-[#838896] overflow-hidden text-ellipsis text-nowrap"
          >
            {barbershop.address}
          </h3>

          <Button className="mt-3 w-full" variant="secondary">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { BarbershopItem }
