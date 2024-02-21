import { redirect } from "next/navigation";
import { Search } from "../(home)/_components/search";
import { Header } from "../_components/Header/header";
import { db } from "../_lib/prisma";
import { BarbershopItem } from "../_components/BarbershopItem/barbershopItem";
import { Barbershop } from "@prisma/client";

interface BarbershopsPageProps {
  searchParams: {
    search: string;
  }
}

export default async function BarbershopsPage({ searchParams }: BarbershopsPageProps) {
  
  if (!searchParams.search) {
    redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive"
      }
    }
  });

  return (
    <>
      <Header />

      <main className="px-5 py-6">
        <Search
          defaultValues={{
            search: searchParams.search
          }}
        />

        <h1 className="mt-6 mb-4 font-bold text-gray-400 text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop: Barbershop) => (
            <div key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
        
      </main>
    </>
  )
}