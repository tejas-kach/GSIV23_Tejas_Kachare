import axios from "axios";
const baseURL = "https://api.themoviedb.org/3";
const axiosInstance = axios.create({
  baseURL:baseURL,
});
axiosInstance.defaults.headers.common['Authorization'] = process.env.REACT_APP_API_KEY;

export const getMovieCredit =async (id) => {
    const response = await axiosInstance.get(`/movie/${id}/credits?language=en-US`)
    return response;
}