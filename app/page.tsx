'use client'
import { useEffect, useState } from "react";
import RequestServices from "./services";
import { CaractersResponseDTO, Images, Powerstats } from "./services/dto/get-caracters-response-dto";
import { Search } from "@mui/icons-material";
import CaractersCard from "./components/CaractersCard";
import ComparisonCard, { ComparisonCardProps } from "./components/ComparasonCards/ComparisonCard";

export default function Home() {
  const [caractersData, setCaractersData] = useState<CaractersResponseDTO[]>();
  const [filtered, setFiltered] = useState<CaractersResponseDTO[]>([]);
  const [search, setSearch] = useState("");
  const [clickedCard, setClickedCard] = useState<ComparisonCardProps["cards"]>([]);
  const [switchSide, setSwitchSide] = useState<boolean>(false);
  const service = new RequestServices("http://homologacao3.azapfy.com.br/api/ps/metahumans");

  const getCaracters = async () => {
    try {
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

  const handleClose = () => {
    setClickedCard([]);
  };

  const handleSwitchSide = () => {
    setSwitchSide((prevState) => !prevState);
  };

  return (
    <div className="bg-slate-800 h-screen flex flex-col">
      <header className="w-full h-16 md:h-20 flex items-center bg-[#f7f7f7] p-4 md:p-6">
        <div className="relative flex items-center w-full max-w-3xl mx-auto">
          <input
            type="text"
            className="w-full p-2 md:p-3 h-10 shadow-sm rounded-md focus:outline-none"
            placeholder="Pesquise o heroi"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Search className="absolute right-2 md:right-4 opacity-50" />
        </div>
      </header>
      <main className="relative flex flex-1 flex-col items-center p-4 md:p-8 lg:p-12 h-full">
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center items-center">
          {filtered ? filtered.map((caracter, index) => (
            <CaractersCard
              key={index}
              name={caracter.name}
              image={caracter.images}
              powerStats={caracter.powerstats}
              onCardClick={handleCardClick}
            />
          )).slice(0, 12) : null}
        </div>
        {clickedCard.length === 2 && (
          <ComparisonCard cards={clickedCard} onClose={handleClose} />
        )}
      </main>
    </div>
  );
}
