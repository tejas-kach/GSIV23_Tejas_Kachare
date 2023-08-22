import "./Home.scss";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/MovieCard.tsx";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppSelector, useAppDispatch } from "../hooks/hooks.ts";
import { intialMovieList, updateMovieList, setSearchList } from "../slice/movie-slice.ts";
import { getMovieList, getSearchMovieList } from "../api/moviedb-api.ts";
import CircularProgress from '@mui/material/CircularProgress';



const Home = () => {
  const movie = useAppSelector((state) => state.moviesState.movieList);
  const movieData = useAppSelector((state) => state.moviesState.listData);
  const searchList = useAppSelector((state) => state.moviesState.searchList);

  const dispatch = useAppDispatch();
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };

  const fetch = async (page: number) => {
    const response = await getMovieList(page);
    const movies = await response?.data?.results;
    console.log("hii1", response.data);
    const movieData = {
      movies,
      listData: {
        page,
        total: response?.data?.total_results,
        search: ''
      }
    }
    if(page===1){
      dispatch(intialMovieList(movieData))
    }else{
      dispatch(updateMovieList(movieData));
    }
  };

  const searchApi = async (page, search) => {
    const response = await getSearchMovieList(page,search);
    const movies = response?.data?.results;
    console.log("hii2", response.data);
    const movieData = {
      movies,
      listData: {
        page,
        total: response?.data?.total_results,
        search
      }
    }
      dispatch(updateMovieList(movieData));

  };
  const fetchData = () => {
    console.log("fet",searchList,movieData)
    if (searchList) {
      searchApi(movieData.page + 1, movieData.search);
    } else {
      fetch(movieData.page + 1);
    }
  };
  
  

  useEffect(() => {
    fetch(1);
    console.log("useeffect");
  }, []);
 
  return (
    <>
      
      <div className="content">
        {console.log("movie",movie,movieData)}
        {movie && (
          <InfiniteScroll
            dataLength={movie?.length} //This is important field to render the next data
            next={fetchData}
            hasMore={movie?.length < movieData.total}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }

          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={2}
                // spacing={{ xs: 2, md: 3 }}
                // columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {movie.map((_, index) => (
                  <Grid item xs={4} sm={4} md={2} key={index}>
                    <MovieCard
                      id={_?.id}
                      title={_?.title}
                      rating={_?.vote_average}
                      image={
                        _?.poster_path
                          ? `https://image.tmdb.org/t/p/original/${_?.poster_path}`
                          : `https://placehold.co/400`
                      }
                      description={_?.overview ?? "No description found"}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Home;
