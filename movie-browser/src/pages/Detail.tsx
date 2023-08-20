import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState({});
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
  const api = async ()=> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const response = await fetchApi(url);
    console.log(response);
    setMovieDetail({...response.data})
  }
  useEffect( () => {
    api();
  }, []);
  return <div>hello noobs{id}</div>;
};

export default Detail;
