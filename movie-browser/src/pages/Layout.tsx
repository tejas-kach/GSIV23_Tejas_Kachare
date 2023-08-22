import { Outlet } from "react-router-dom";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import { getMovieList, getSearchMovieList } from "../api/moviedb-api.ts";
import {
  intialMovieList,
  setSearchList,
  updateMovieList,
} from "../slice/movie-slice.ts";
import { useAppDispatch } from "../hooks/hooks.ts";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const Layout = () => {
  const dispatch = useAppDispatch();
  const route = useNavigate();
  const routeChange = () => {
    let path = `/`;
    route(path);
  };
  const searchApi = async (page, search) => {
    const response = await getSearchMovieList(page, search);
    const movies = response?.data?.results;
    console.log("hiil", response.data);

    const movieData = {
      movies,
      listData: {
        page,
        total: response?.data?.total_results,
        search,
      },
    };
    dispatch(intialMovieList(movieData));
    dispatch(setSearchList(true));
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
        search: "",
      },
    };
    if (page === 1) {
      dispatch(intialMovieList(movieData));
    } else {
      dispatch(updateMovieList(movieData));
    }
  };

  const handleInput = debounce((event: any) => {
    const search = event.target?.value;
    console.log("input", search);
    if (event.target?.value === "") {
      dispatch(setSearchList(false));
      fetch(1);
    } else {
      searchApi(1, event.target?.value);
    }
  },500);
  const appBarContent = () => {
    if (window.location.pathname.includes("/details")) {
      return (
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{display: { xs: "none", sm: "block" } }}
        >
          Movie Details
        </Typography>
      );
    } else {
      return (
        <Box >
        <Search onChange={handleInput}  className="movie-search">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        </Box>
      );
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="movie-app-bar">
          <Toolbar sx={{justifyContent: "space-between"}}>
            {appBarContent()}
            <HomeIcon sx={{cursor: "pointer"}} onClick={routeChange}/>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </>
  );
};

export default Layout;
