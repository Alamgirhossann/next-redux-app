import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  fetchWeather,
} from "@/features/weather/weatherSlice";

const Weather = ({ data }) => {
  const dispatch = useDispatch();
  const { weather, error, dataPost } = useSelector(
    (state) => state.weather
  );
  const [query, setQuery] = useState("New York");

  useEffect(() => {
    dispatch(fetchWeather(query)).then((data)=> dispatch(
          fetchPost({ lat: data?.payload?.coord?.lat, lon: data?.payload?.coord?.lon })
        ));
    ;
  }, [query]);

  return (
    <div className="mt-10">
      <div className="flex justify-center mb-5 ">
        <select onChange={(e) => setQuery(e.target.value)}>
          {[
            "New York",
            "London",
            "Dubai",
            "Mumbai",
            "Tokyo",
            "Moscow",
            "Toronto",
          ].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {weather.main ? (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <p>{error}</p>
      )}

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataPost?.daily?.slice(0, 7).map((item, i) => {
          const { clouds, dt, pressure, weather } = item;
          // console.log(dt)
          const date = new Date(dt).toDateString();

          return (
            <div key={i} className=" flex items-center justify-center  mt-5 h-auto w-40 space-x-4 rounded-xl cursor-pointer bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
              <div className="">
                <div>{date}</div>
                <div>Clouds: {clouds}</div>
                <div>Air pressure: {pressure}</div>
                <div>
                  {
                    weather.map((item, i) => {
                    // console.log(item);
                    return (
                      <div key={i} className="info">
                        <img
                          className="city-icon"
                          src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                          alt={item.description}
                        />
                        <p>{item.description}</p>
                      </div>
                    );
                  })
                }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=f33a484cf794d08d0148764789aaba32`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
