import "./Home.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MovieCard from "../components/MovieCard.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Home = () => {
  const [movie, setMovie] = useState([]);
  const [movieData, setMovieData] = useState({
    page: 1,
    size: 20,
    total: 100,
    search: ''
  });
  const [searchList, setSearchList] = useState<Boolean>(false);
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_KEY,
    },
  };
  const fetchApi =async (url:string) => {
    const response = await axios.get(
      url,
      options
    );
    return response;
  }

  const intialFetch = async (page: 1) => {
    let url =`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc`;
    console.log("url",url)
    const response = await fetchApi(url)
    const movies = await response?.data?.results;
    console.log("hii", response.data);

      setMovie([...movies]);
      setMovieData({
        ...movieData,
        page: page,
        total: response.data?.total_results || 100,
      });
    
  };

  const fetch = async (page: 1) => {
    let url =`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=primary_release_date.desc`;
    console.log("url",url)
    const response = await fetchApi(url)
    const movies = await response?.data?.results;
    console.log("hii", response.data);

      setMovie([...movie, ...movies]);
      setMovieData({
        ...movieData,
        page: page,
        total: response.data?.total_results || 100,
      });
    
  };

  const fetchData = () => {
    if(searchList){
      searchApi(movieData.page + 1,movieData.search)
    }else {
      fetch(movieData.page + 1);
    }
  };
  const searchApi =async (page,search)=> {
    const url=`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
    const response = await fetchApi(url)
    const movies = await response?.data?.results;
    console.log("hii", response.data);
    if(searchList && movieData.search===search){
      setMovie([...movie,...movies]);
      setMovieData({
        ...movieData,
        search: search,
        page: page,
        total: response.data?.total_results,
      });
    }else{
      setMovie([...movies]);
      setMovieData({
        ...movieData,
        search: search,
        page: page,
        total: response.data?.total_results,
      });

    setSearchList(true);
    }
  
  }

  const handleInput=(event: any)=>{
    const search= event.target?.value
    console.log("input",search);
    if(event.target?.value==='' && searchList) {
      setSearchList(false)
      intialFetch(1);
    }else{
      searchApi(1,event.target?.value);
    }

  }

  useEffect(() => {
    intialFetch(1);
    console.log("useeffect");
  }, []);
  return (
    <>
      <div className="nav-bar">
        <div>Movie Detail

        <Search onChange={handleInput}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
        <div className="">
          <HomeIcon />
        </div>
      </div>
      <div className="content">
        <InfiniteScroll
          dataLength={movie.length} //This is important field to render the next data
          next={fetchData}
          hasMore={movie.length < movieData.total}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8593; Release to refresh
          //   </h3>
          // }
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              // columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {console.log("move", movie, movieData)}
              {movie.map((_, index) => (
                <Grid item xs={4} sm={4} md={2} key={index}>
                  <MovieCard info={_} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
