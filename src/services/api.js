import axios from "axios";

export const url = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
export const imagePath = "https://image.tmdb.org/t/p/w300/";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

// TRENDING

export const fetchTrending = async (timeWindow = "day") => {
  try {
    const { data } = await axios.get(
      `${url}/trending/all/${timeWindow}?api_key=${API_KEY}`
    );
    return data.results;
  } catch (error) {
    console.error("Error while fetching trending data: ", error);
  }
};

// Get Details

export const fetchDetails = async (type, id) => {
  try {
    const res = await axios.get(`${url}/${type}/${id}?api_key=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error("Error while fetching details: ", error);
  }
};

// Get Credits

export const fetchCredits = async (type, id) => {
  try {
    const res = await axios.get(
      `${url}/${type}/${id}/credits?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while fetching credits: ", error);
  }
};

// get videos
export const fetchVideos = async (type, id) => {
  try {
    const res = await axios.get(
      `${url}/${type}/${id}/videos?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while fetching videos: ", error);
  }
};

// fetch movies
export const fetchMovies = async (page, sortBy) => {
  try {
    const res = await axios.get(
      `${url}/discover/movie?page=${page}&sort_by=${sortBy}&api_key=${API_KEY}`
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};

// fetch tv series
export const fetchShows = async (page, sortBy) => {
  try {
    const res = await axios.get(
      `${url}/discover/tv?page=${page}&sort_by=${sortBy}&api_key=${API_KEY}`
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching tv series: ", error);
  }
};

// search
export const searchQuery = async (query, page) => {
  try {
    const res = await axios.get(
      `${url}/search/multi?page=${page}&query=${query}&api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error while searching: ", error);
  }
};
