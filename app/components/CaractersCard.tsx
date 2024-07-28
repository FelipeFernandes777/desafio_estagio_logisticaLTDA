import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Images, Powerstats } from '../services/dto/get-caracters-response-dto';

interface CaractersCardProps {
  name: string,
  image: Images
  powerStats: Powerstats
  onCardClick: (name: string, image: Images, powerStats: Powerstats) => void
}

export default function CaractersCard({ name, image, powerStats, onCardClick }: CaractersCardProps) {

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState);
    onCardClick(name, image, powerStats)
  }
  return (
    <div onClick={handleClick}>
      <Card className={`${isClicked == true ? "border-slate-300 border-[2px] scale-105" : null} w-[400px] flex items-center cursor-pointer`}>
        <div className='w-1/2' >
          <img src={image.md} alt={"Imagem do super heroi: " + name} className='w-full h-full' />
        </div>
        <CardContent className='flex justify-center w-full h-full'>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
