import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

const BookingItem = () => {
	return (
		<Card>
			<CardContent className="px-0 py-0 flex">
				<div className="px-3 py-3 grow">
					<Badge className="bg-[#221C3D] text-primary">Confirmado</Badge>
          <h2 className="mt-3 mb-2 text-base font-bold">Corte de Cabelo</h2>
  
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="Imagem da barbearia"
                width={24}
                height={24}
              />
              <AvatarFallback>JU</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
				</div>
				<div className="flex flex-col justify-center items-center mw-[106px] px-7 border-l">
          <p className="text-xs">Fervereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-xs">09:45</p>
				</div>
			</CardContent>
		</Card>
	)
}

export { BookingItem }
