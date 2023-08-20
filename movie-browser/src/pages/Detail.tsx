import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { getMovieCredit } from "../api/moviedb-api";

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [movieCredit, setMovieCredit] = useState({});
  const { id } = useParams() || 0;
  console.log("detaailllllslsls", id);
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };
  const fetchApi = async (url: string) => {
    const response = await axios.get(url, options);
    return response;
  };
  const api = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const [response, credit] = await Promise.all([
      fetchApi(url),
      getMovieCredit(id),
    ]);
    console.log("response", response, " credit", credit);
    setMovieDetail({ ...response.data });
    setMovieCredit({ ...credit.data });
  };
  useEffect(() => {
    api();
  }, []);
  return (
    <Card
      sx={{
        display: "flex",
        gap: 4,
        padding: "20px",
        flexWrap: { xs: "wrap", lg: "nowrap" },
      }}
    >
      <Box>
        <CardMedia
          component="img"
          sx={{ width: "100%", minWidth: 200, maxHeight: 300 }}
          image={
            movieDetail?.poster_path
              ? `https://image.tmdb.org/t/p/original/${movieDetail?.poster_path}`
              : `https://placehold.co/500`
          }
        />
      </Box>
      <Box>
        <Typography gutterBottom variant="h5" component="h5">
          {movieDetail?.title} ({movieDetail?.popularity})
        </Typography>
        {/* <Typography gutterBottom variant="body1" component="p">
          {releaseYear} | {formatedTime} | {director?.name}
        </Typography> */}
        {/* <Typography gutterBottom variant="body1" component="p">
          Cast: {cast?.toString()}
        </Typography> */}
        <Typography gutterBottom variant="body1" component="p">
          Description: {movieDetail?.overview}
        </Typography>
      </Box>
    </Card>
  );
};

export default Detail;
