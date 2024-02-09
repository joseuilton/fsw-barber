"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
    service: Service;
    isLogged: boolean;
}

function ServiceItem({ service, isLogged }: ServiceItemProps) {
    async function handleReservation() {
        if (!isLogged) {
            await signIn("google")
        }
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
                        <Button variant="secondary" onClick={handleReservation}>
                            Reservar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { ServiceItem };