'use client'
import { useEffect, useState } from "react";
import RequestServices from "./services";
import { CaractersResponseDTO, Images, Powerstats } from "./services/dto/get-caracters-response-dto";
import { Search } from "@mui/icons-material";
import CaractersCard from "./components/CaractersCard";
import ComparisonCard from "./components/ComparasonCards/ComparisonCard";

export default function Home() {
  const [caractersData, setCaractersData] = useState<CaractersResponseDTO[]>(); // Guarda todos os dados da api.
  const [filtered, setFiltered] = useState<CaractersResponseDTO[]>([]); // Guarda os novos dados no array.
  const [search, setSearch] = useState(""); // Usado para guardar o valor digitado no pesquisar.
  const [clickedCard, setClickedCard] = useState<ComparisonCardProps[]>([]); // Guardar os cards que foram clicados.
  const service = new RequestServices("http://homologacao3.azapfy.com.br/api/ps/metahumans");

  const getCaracters = async () => {
    try {
      // Realiza a chamada da api
      const response = await service.listCaracters();
      setCaractersData(response.body);
      setFiltered(response.body);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  useEffect(() => {
    getCaracters();
  }, []);

  useEffect(() => {
    // Guarda o novo resultado da api
    if (caractersData) {
      setFiltered(caractersData.filter(
        item => item.name.toLowerCase().includes(search.toLowerCase())
      ));
    }
  }, [search]);

  const handleCardClick = (name: string, image: Images, powerStats: Powerstats) => {
    setClickedCard((prevState) => {
      const newCard = { name, image, powerStats };
      const updatedState = [...prevState, newCard];
      return updatedState.length > 2 ? updatedState.slice(-2) : updatedState;
    });
  };

  return (
    <div className="bg-slate-800 h-full">
      <header className="w-full h-24 flex items-center bg-[#f7f7f7]">
        <div className="ml-5 relative flex items-center">
          <input type="text"
            className="w-full p-3 h-10 shadow-sm rounded-md focus:outline-none"
            placeholder="Pesquise o heroi"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Search className="absolute right-1 opacity-20" />
        </div>
      </header>
      <main className="relative flex justify-center items-center">
        <div className="flex flex-wrap gap-[25px] justify-center items-center p-8">
          {
            filtered ? filtered.map((caracter, index) => (
              <CaractersCard
                key={index}
                name={caracter.name}
                image={caracter.images}
                powerStats={caracter.powerstats}
                onCardClick={handleCardClick}
              />
            )).slice(0, 12) : null
          }
        </div>
        {
          clickedCard.length === 2 ? (
            <ComparisonCard cards={clickedCard} />
          ) : null
        }
      </main>
    </div>
  );
}
