import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { BarbershopInfo } from "./_components/barbershopInfo";

interface BarbershopDetailsPageProps {
    params: {
        id: string;
    }
}

async function BarbershopDetailsPage(props: BarbershopDetailsPageProps) {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: props.params.id
        }
    });

    if (!barbershop) {
        return null;
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />
        </div>
    )
}

export default BarbershopDetailsPage;