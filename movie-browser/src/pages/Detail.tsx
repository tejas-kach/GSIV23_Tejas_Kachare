import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { getMovieCredit, getMovieDetails } from "../api/moviedb-api.ts";

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [movieCredit, setMovieCredit] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const release = new Date(movieDetail?.release_date ?? "").getFullYear();
  const movieTime = movieDetail?.runtime;
  const director = movieCredit?.crew?.find((per) => per?.job === "Director");
  const cast = movieCredit?.crew?.map((c) => c?.name);

  const { id } = useParams() || 0;

  const movieDetailApi = async () => {
    try {
      const [response, credit] = await Promise.all([
        getMovieDetails(id),
        getMovieCredit(id),
      ]);
      setMovieDetail({ ...response.data });
      setMovieCredit({ ...credit.data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    movieDetailApi();
  }, []);
  return (
    <>
      {!loading && error && (
        <Typography sx={{textAlign:"center"}} gutterBottom variant="h5" component="h5">
          {error}
        </Typography>
      )}
      {loading && (
        <Stack alignItems="center" mt={5}>
          <CircularProgress />
        </Stack>
      )}
      {!loading && movieDetail && !error && (
        <Box
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
              sx={{ width: "100%", minWidth: 240, maxHeight: 340 }}
              image={
                movieDetail?.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movieDetail?.poster_path}`
                  : `https://placehold.co/500`
              }
            />
          </Box>
          <Box>
            <Typography gutterBottom variant="h4" component="h4">
              {movieDetail?.title} <span style={{fontSize: "1.5rem"}}>({Math.round(movieDetail?.vote_average || 0)})</span>
            </Typography>
            {movieCredit && (
              <>
                <Typography gutterBottom variant="body2" component="p">
                  {release} | {`${movieTime} min`} | {director?.name}
                </Typography>
                <Typography gutterBottom variant="body2" component="p" className="movie-detail-ellipse">
                  Cast: {cast?.toString()}
                </Typography>
              </>
            )}
            <Typography gutterBottom variant="body2" component="p">
              Description: {movieDetail?.overview}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Detail;
