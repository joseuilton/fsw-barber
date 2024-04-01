"use client";

import { SideMenu } from "@/app/_components/SideMenu/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop;
}

function BarbershopInfo({ barbershop }: BarbershopInfoProps) {

    const router = useRouter();

    function handleBackToHome() {
        router.replace("/");
        return;
    }

    return (
        <header className="pb-6 border-b border-secondary lg:border-b-0">
            <div className="relative h-[250px] lg:h-[490px]">
                <Button
                    variant="secondary"
                    className="absolute top-6 left-5 z-50 p-2.5 lg:hidden"
                    onClick={handleBackToHome}
                >
                    <ChevronLeftIcon size={20} />
                </Button>
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="secondary" className="absolute top-6 right-5 z-50 p-2.5">
                                <MenuIcon size={20} />
                            </Button>
                        </SheetTrigger>
                        <SideMenu />
                    </Sheet>
                </div>

                <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    fill
                    style={{
                        objectFit: "cover"
                    }}
                    className="opacity-85 lg:opacity-100 lg:rounded-lg"
                />
            </div>

            <div className="pt-3 lg:pt-5 flex flex-col gap-2 lg:flex-row lg:justify-between">
                <div>
                    <h1 className="text-xl font-bold mb-3 lg:text-3xl">{barbershop.name}</h1>
                    <p className="flex items-center gap-2 text-sm">
                        <MapPinIcon size={16} className="fill-primary stroke-primary" />
                        {barbershop.address}
                    </p>
                </div>
                <div>
                    <p className="text-sm flex gap-2 lg:flex-col lg:justify-center lg:items-center
                                  lg:py-2.5 lg:px-5 lg:rounded-lg lg:bg-[#1A1B1F]">
                        <span className="flex items-center gap-2 lg:text-xl">
                            <StarIcon
                                size={16}
                                className="fill-primary stroke-primary lg:w-[20px] lg:h-[20px]"
                            />
                            5,0
                        </span>
                        <span className="lg:text-xs">889 avaliações</span>
                    </p>
                </div>
            </div>
        </header>
    )
}

export { BarbershopInfo };