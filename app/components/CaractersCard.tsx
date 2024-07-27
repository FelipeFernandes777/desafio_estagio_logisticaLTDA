import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

interface CaractersCardProps {
  name: string,
  image: string
}

export default function CaractersCard({ name, image, }: CaractersCardProps) {

  const [isClicked, setIsClicked] = useState<boolean>(false);
  
  const handleClick = () => {
    setIsClicked(prevState => !prevState);
    console.log(isClicked)
  }
  return (
    <div onClick={handleClick}>
      <Card className={`${isClicked == true ? "border-black border-[3px]" : null} w-[400px] flex items-center cursor-pointer`}>
        <div className='w-1/2' >
          <img src={image} alt={"Imagem do super heroi: " + name} className='w-full h-full' />
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
