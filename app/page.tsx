'use client'
import { useEffect, useState } from "react";
import RequestServices from "./services";
import { CaractersResponseDTO } from "./services/dto/get-caracters-response-dto";
import { Search } from "@mui/icons-material";
import CaractersCard from "./components/CaractersCard";

export default function Home() {
  const [caractersData, setCaractersData] = useState<CaractersResponseDTO[]>();
  const [filtered, setFiltered] = useState<CaractersResponseDTO[]>([]);
  const [search, setSearch] = useState("");
  const service = new RequestServices("http://homologacao3.azapfy.com.br/api/ps/metahumans");

  const getCaracters = async () => {
    try {
      const response = await service.listCaracters();
      //Retornar os elementos dentro de 1 array
      setCaractersData(response.body)
      setFiltered(response.body)
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }
  useEffect(() => {
    getCaracters();
  }, [])

  useEffect(() => {
    if (caractersData) {
      setFiltered(caractersData.filter(
        item => item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      ))
    }
  }, [search])

  return (
    <div className="bg-slate-800 h-full">
      <header className="w-full h-24 flex items-center bg-[#f7f7f7]">
        <div className="ml-5 relative flex items-center">
          <input type="text"
            className="w-full p-3 h-10 shadow-sm rounded-md focus:outline-none"
            placeholder="Pesquise o heroi"
            onChange={(event) => setSearch(event.target.value)
            }
          />
          <Search className="absolute right-1 opacity-20" />
        </div>
      </header>
      <div className="flex flex-wrap gap-[25px] justify-center items-center p-8">
        {
          filtered ? filtered.map((caracter, index) => (
            <CaractersCard key={index} name={caracter.name} image={caracter.images.md}></CaractersCard>
          )).slice(0, 12) : null
        }
      </div>
    </div>
  );
}