import { Images, Powerstats } from "@/app/services/dto/get-caracters-response-dto";
import Card from "./Card";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  image: Images;
  powerStats: Powerstats;
}

export interface ComparisonCardProps {
  cards: Props[];
  onClose: () => void;
}

export default function ComparisonCard({ cards, onClose }: ComparisonCardProps) {
  const [visible, setVisible] = useState<boolean>(true);
  const [winnerResult, setWinnerResult] = useState<{ winner: string; statsComparison: Record<string, string> } | null>(null);

  const calculateStats = (powerStats: Powerstats) => {
    const total =
      powerStats.intelligence +
      powerStats.strength +
      powerStats.speed +
      powerStats.durability +
      powerStats.power +
      powerStats.combat;
    return total / 6;
  };

  const compareStats = (stat1: number, stat2: number) => {
    if (stat1 > stat2) {
      return 'up';
    } else if (stat1 < stat2) {
      return 'down';
    } else {
      return 'equal';
    }
  };

  const calculateWinner = (cards: Props[]) => {
    if (cards.length !== 2) {
      throw new Error("A função calculateWinner espera exatamente 2 cards.");
    }

    const [card1, card2] = cards;
    const card1Stats = card1.powerStats;
    const card2Stats = card2.powerStats;

    const statsComparison = {
      intelligence: compareStats(card1Stats.intelligence, card2Stats.intelligence),
      strength: compareStats(card1Stats.strength, card2Stats.strength),
      speed: compareStats(card1Stats.speed, card2Stats.speed),
      durability: compareStats(card1Stats.durability, card2Stats.durability),
      power: compareStats(card1Stats.power, card2Stats.power),
      combat: compareStats(card1Stats.combat, card2Stats.combat),
    };

    const averageCard1 = calculateStats(card1Stats);
    const averageCard2 = calculateStats(card2Stats);

    const winner =
      averageCard1 > averageCard2
        ? card1.name
        : averageCard2 > averageCard1
          ? card2.name
          : 'Empate';

    return {
      winner,
      statsComparison,
    };
  };

  useEffect(() => {
    if (cards.length === 2) {
      const result = calculateWinner(cards);
      setWinnerResult(result);
    }
  }, [cards]);

  useEffect(() => {
    if (!visible) {
      onClose();
    }
  }, [visible, onClose]);

  const handleVisibility = () => {
    setVisible(false);
  }

  return (
    <div className={`w-11/12 md:w-4/6 lg:w-3/4 xl:w-1/2 h-4/5 md:h-4/6 lg:h-5/6 border border-blue-700 shadow-lg shadow-zinc-300/15 absolute bg-gradient-to-tr from-blue-600/90 to-slate-700 rounded-md flex flex-col items-center p-4 md:p-6 lg:p-8 xl:p-10 card ${visible ? '' : 'hidden'}`}>
      <Close className="absolute top-4 right-4 cursor-pointer" onClick={handleVisibility} />
      <div className="w-full mb-4 text-center">
        {winnerResult && (
          <span className="text-2xl font-bold">Winner: {winnerResult.winner}</span>
        )}
      </div>
      <div className="w-full h-5/6 container flex flex-col md:flex-row gap-3">
        {cards.length === 2 && (
          <>
            <Card
              name={cards[0].name}
              src={cards[0].image.md}
              powerStats={cards[0].powerStats}
              swithSides={true}
            />
            <div className="h-full w-full md:w-2/6 flex items-center justify-center">
              <ul className="font-bold text-xl text-center">
                <li>Inteligência</li>
                <li>Força</li>
                <li>Velocidade</li>
                <li>Durabilidade</li>
                <li>Poder</li>
                <li>Combate</li>
              </ul>
            </div>
            <Card
              name={cards[1].name}
              src={cards[1].image.md}
              powerStats={cards[1].powerStats}
              swithSides={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
