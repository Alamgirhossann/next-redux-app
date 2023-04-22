import axios from "axios";
const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "f33a484cf794d08d0148764789aaba32";

export const getWeather = async (query) => {
 const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=288b4a480e26e0f0509e1f8334d45868`)
  const data = await res.json()
  return data;
};

export const getPost = async (lat,lon) => {
  const post = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=288b4a480e26e0f0509e1f8334d45868`)
   const postData = await post.json()
   return postData;
 };




