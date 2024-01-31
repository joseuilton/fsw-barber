import { format } from "date-fns";
import { Header } from "../_components/Header/header";
import { ptBR } from "date-fns/locale";
import { Search } from "./_components/search";
import { BookingItem } from "../_components/BookingItem/bookingItem";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h1 className="mb-1 text-xl font-bold">
          Olá, Miguel!
        </h1>

        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5">
        <Search />
      </div>

      <div className="px-5 pt-9 pb-6">
        <h2 className="uppercase text-gray-400 text-xs font-bold mb-3">Agendamentos</h2>
        <BookingItem />  
     </div>
    </div>
  );
}
