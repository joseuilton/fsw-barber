import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopInfoProps {
    barbershop: Barbershop;
}

function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
    return (
        <header className="pb-6 border-b border-secondary">
            <div className="relative min-h-[250px] max-h-[250px]">
                <Button variant="secondary" className="absolute top-6 left-5 z-50 p-2.5">
                    <ChevronLeftIcon size={20} />
                </Button>
                <Button variant="secondary" className="absolute top-6 right-5 z-50 p-2.5">
                    <MenuIcon size={20} />
                </Button>
                <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    fill
                    style={{
                        objectFit: "cover"
                    }}
                    className="opacity-85"
                />
            </div>

            <div className="pt-3 px-5">
                <h1 className="text-xl font-bold mb-3">{barbershop.name}</h1>
                <p className="flex items-center gap-2 mb-2 text-sm">
                    <MapPinIcon size={16} className="fill-primary stroke-primary" />
                    {barbershop.address}
                </p>
                <p className="flex items-center gap-2 text-sm">
                    <StarIcon size={16} className="fill-primary stroke-primary" />
                    5,0 (889 avaliações)
                </p>
            </div>
        </header>
    )
}

export { BarbershopInfo };