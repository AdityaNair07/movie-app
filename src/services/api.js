import axios from "axios";

export const url = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
export const imagePath = "https://image.tmdb.org/t/p/w300/";

// TRENDING

export const fetchTrending = async (timeWindow = "day") => {
  try {
    const { data } = await axios.get(
      `${url}/trending/all/${timeWindow}?api_key=${API_KEY}`
    );
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

// Get Details

export const fetchDetails = async (type, id) => {
  try {
    const res = await axios.get(`${url}/${type}/${id}?api_key=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
