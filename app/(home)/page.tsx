import { format } from "date-fns";
import { Header } from "../_components/Header/header";
import { ptBR } from "date-fns/locale";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 py-6">
        <h1 className="mb-1 text-xl font-bold">
          Olá, Miguel!
        </h1>
        <p className="text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  );
}
