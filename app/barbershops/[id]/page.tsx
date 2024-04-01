import { db } from "@/app/_lib/prisma";
import { BarbershopInfo } from "./_components/barbershopInfo";
import { ServiceItem } from "./_components/serviceItem";
import { Service } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { Header } from "@/app/_components/Header/header";
import { Card, CardContent } from "@/app/_components/ui/card";
import { BarbershopMap } from "@/app/_components/barbershopMap/barbershopMap";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { SmartphoneIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopDetailsPageProps {
    params: {
        id: string;
    }
}

async function BarbershopDetailsPage(props: BarbershopDetailsPageProps) {
    const session = await getServerSession(authOptions);

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
            <div className="hidden lg:block">
                <Header variant="withSearch" />
            </div>

            <div className="container mx-auto px-5 lg:mt-10 lg:grid lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <BarbershopInfo barbershop={barbershop} />

                    <div className="lg:mt-10">
                        <h2 className="hidden text-sm text-[#838896] uppercase font-bold lg:block">
                            Serviços
                        </h2>

                        <div
                            className="grid grid-cols-1 gap-3 mt-6 lg:mt-3 lg:gap-x-5 lg:gap-y-3
                                       lg:grid-cols-2"
                        >
                            {barbershop.services.map((service: Service) => (
                                <ServiceItem
                                    key={service.id}
                                    service={service}
                                    barbershopName={barbershop.name}
                                    user={session?.user}
                                />
                            ))}
                        </div>
                    </div>

                </div>

                <div className="hidden lg:block lg:col-span-4 lg:pl-10">
                    <Card className="border-transparent">
                        <CardContent className="flex flex-col gap-5 p-5">
                            <BarbershopMap barbershop={barbershop} />

                            <div>
                                <h2 className="text-sm font-bold uppercase">Sobre nós</h2>
                                <p className="mt-2.5 text-sm text-[#838896]">
                                    Bem-vindo à Vintage Barber, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.
                                </p>
                            </div>

                            <Separator />

                            <ul className="flex flex-col gap-2.5">
                                <li className="flex justify-between items-center">
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <SmartphoneIcon size={24} />
                                        (11) 98204-5108
                                    </div>

                                    <Button variant={"secondary"}>
                                        Copiar
                                    </Button>
                                </li>

                                <li className="flex justify-between items-center">
                                    <div className="flex items-center gap-2.5 text-sm">
                                        <SmartphoneIcon size={24} />
                                        (11) 98204-5108
                                    </div>

                                    <Button variant={"secondary"}>
                                        Copiar
                                    </Button>
                                </li>
                            </ul>

                            <Separator />

                            <table>
                                <tbody>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Segunda
                                        </th>
                                        <td className="text-right text-sm">Fechado</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Terça-feira
                                        </th>
                                        <td className="text-right text-sm">09:00 - 21:00</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Quarta-feira
                                        </th>
                                        <td className="text-right text-sm">09:00 - 21:00</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Quinta-feira
                                        </th>
                                        <td className="text-right text-sm">09:00 - 21:00</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Sexta-feira
                                        </th>
                                        <td className="text-right text-sm">09:00 - 21:00</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Sábado
                                        </th>
                                        <td className="text-right text-sm">08:00 - 17:00</td>
                                    </tr>
                                    <tr>
                                        <th className="text-left text-sm font-normal text-[#838896]">
                                            Domingo
                                        </th>
                                        <td className="text-right text-sm">Fechado</td>
                                    </tr>
                                </tbody>

                            </table>

                            <Separator />

                            <div className="py-5 flex justify-between items-center">
                                <h3>Em parceria com</h3>
                                <Image
                                    src={"/logo.png"}
                                    alt="Logo da FSW Barber"
                                    width={130}
                                    height={22}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>


        </div>
    )
}

export default BarbershopDetailsPage;
