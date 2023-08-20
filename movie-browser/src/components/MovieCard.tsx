import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = (props)=> {
  const route = useNavigate()
  const routeChange = () =>{ 
    let path = `/detail/${props.info.id}`; 
    route(path);
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={routeChange}>
        <CardMedia
          component="img"
          height="140"
          image={`https://image.tmdb.org/t/p/w92/${props.info.poster_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.info.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;