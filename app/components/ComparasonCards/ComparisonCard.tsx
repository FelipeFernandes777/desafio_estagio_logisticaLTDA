import { Images, Powerstats } from "@/app/services/dto/get-caracters-response-dto";
import Card from "./Card";

interface Props {
  name: string
  image: Images
  powerStats: Powerstats
}

interface ComparisonCardProps {
  cards: Props[];
}

export default function ComparisonCard({ cards }: ComparisonCardProps) {
  return (
    <div className="w-4/6 h-5/6 border border-blue-700 shadow-lg shadow-zinc-300/15 absolute bg-gradient-to-tr from-blue-600/90 to-slate-700 rounded-md flex items-center p-10 card">
      <div className="w-full h-5/6 container flex gap-3">
        {cards.length === 2 && (
          <>
            <Card
              name={cards[0].name}
              src={cards[0].image.md}
              powerStats={cards[0].powerStats}
            />
            <div className="h-full w-2/6">
              <div className="w-full h-full flex items-center justify-center">
                <ul className="font-bold text-xl text-center">
                  <li>Inteligência</li>
                  <li>Força</li>
                  <li>Velocidade</li>
                  <li>Durabilidade</li>
                  <li>Poder</li>
                  <li>Combate</li>
                </ul>
              </div>
            </div>
            <Card
              name={cards[1].name}
              src={cards[1].image.md}
              powerStats={cards[1].powerStats}
            />
          </>
        )}
      </div>
    </div>
  );
}
