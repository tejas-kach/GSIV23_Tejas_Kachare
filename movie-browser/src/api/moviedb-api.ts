import axios from "axios";
const baseURL = "https://api.themoviedb.org/3";
const movieDbApi = axios.create({
  baseURL: baseURL,
});
movieDbApi.defaults.headers.common["Authorization"] =
  process.env.REACT_APP_API_KEY;

export const getMovieCredit = async (id: number) => {
  const response = await movieDbApi.get(`/movie/${id}/credits?language=en-US`);
  return response;
};

export const getMovieList = async (page: number) => {
  const response = await movieDbApi.get(
    `/movie/upcoming?language=en-US&page=${page}`
  );
  return response;
};

export const getSearchMovieList = async (page: number, search: string) => {
  const response = await movieDbApi.get(
    `/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`
  );
  return response;
};

export const getMovieDetails = async (id: string) => {
  const response = await movieDbApi.get(`/movie/${id}?language=en-US`);
  return response;
};

movieDbApi.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => Promise.reject(createError(error))
);

function createError(error: any) {
  console.log("error");
  if (axios.isCancel(error)) return error;

  const statusCode = error?.response.status;
  const statusText =
    error?.response?.data?.error?.message ||
    error?.response?.statusText ||
    error?.message ||
    "Something went wrong";

  return { code: statusCode, message: statusText };
}
