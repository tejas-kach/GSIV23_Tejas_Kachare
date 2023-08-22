import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = React.memo((props)=> {
  const route = useNavigate()
  const routeChange = () =>{ 
    let path = `/details/${props.id}`; 
    route(path);
  }
  return (
    <Card
    sx={{ maxWidth: 345, minHeight: 240, cursor: "pointer" }}
  >
    <CardActionArea onClick={routeChange}>
    <CardMedia sx={{ width: "100%", height: 300 }} image={props.image} />
    <CardContent sx={{padding:"10px"}}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={{fontSize: "1rem"}}gutterBottom variant="h5" component="p" noWrap>
          {props.title}
        </Typography>
        <Typography gutterBottom variant="caption" component="span">
          {props.rating}
        </Typography>
      </Stack>
      <Typography className='movie-card-desc' variant="body2" color="text.secondary">
        {props.description}
      </Typography>
    </CardContent>
    </CardActionArea>
  </Card>
  );
})

export default MovieCard;