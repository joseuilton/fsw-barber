import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { BarbershopInfo } from "./_components/barbershopInfo";
import { ServiceItem } from "./_components/serviceItem";
import { Service } from "@prisma/client";

interface BarbershopDetailsPageProps {
    params: {
        id: string;
    }
}

async function BarbershopDetailsPage(props: BarbershopDetailsPageProps) {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: props.params.id
        },
        include: {
            services: true
        }
    });

    if (!barbershop) {
        return null;
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className="flex flex-col px-5 gap-3 mt-6">
                {barbershop.services.map((service: Service) => (
                    <ServiceItem key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}

export default BarbershopDetailsPage;