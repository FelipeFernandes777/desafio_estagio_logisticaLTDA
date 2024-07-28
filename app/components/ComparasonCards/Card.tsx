import { Powerstats } from "@/app/services/dto/get-caracters-response-dto"

interface CardProps {
  name: string,
  src: string,
  powerStats: Powerstats
}

export default function Card({ name, src, powerStats }: CardProps) {
  return (
    <div className="h-full w-2/6 flex flex-wrap">
      <div className="w-full h-full flex gap-5 items-center justify-center">
        <div className="w-[95%] h-full">
          <img src={src} alt={`Imagem do personagem: ` + name} className="w-full h-full" />
        </div>
        <div className="h-6/6 font-bold text-xl w-[5%]">
          <ul>
            <li>{powerStats.intelligence}</li>
            <li>{powerStats.strength}</li>
            <li>{powerStats.speed}</li>
            <li>{powerStats.durability}</li>
            <li>{powerStats.power}</li>
            <li>{powerStats.combat}</li>
          </ul>
        </div>
      </div>
      <span className="font-bold text-xl mt-3">{name}</span>
    </div>
  )
}