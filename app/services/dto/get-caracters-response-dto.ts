export interface CaractersResponseDTO {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  appearance: Appearance;
  biography: Biography;
  images: Images;
}

export interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface Appearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}

export interface Biography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
}

export interface Images {
  xs: string,
  sm: string,
  md: string,
  lg: string,
}