export interface CaractersResponseDTO {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  appearance: Appearance;
  biography: Biography;
}

interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

interface Appearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}

interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
}
