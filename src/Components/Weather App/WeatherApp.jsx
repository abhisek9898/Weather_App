import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

export const WeatherApp = () => {
  let api_key = "783c478079f957096566d088e0b375f8";

  const [wicon, setWicon] = useState("clear_icon");

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    if (humidity.length > 0) {
      humidity[0].innerHTML = data.main.humidity + "%";
    }
    if (wind.length > 0) {
      wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    }
    if (temperature.length > 0) {
      temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    }
    if (location.length > 0) {
      location[0].innerHTML = data.name;
    }
    // Determine the appropriate icon based on weather data
    const icon = data.weather[0].icon;

    if (icon === "01d" || icon === "01n") {
      setWicon(clear_icon);
    } else if (icon === "02d" || icon === "02n") {
      setWicon(cloud_icon);
    } else if (icon === "03d" || icon === "03n") {
      setWicon(drizzle_icon);
    } else if (icon === "04d" || icon === "04n") {
      setWicon(drizzle_icon);
    } else if (icon === "09d" || icon === "09n") {
      setWicon(rain_icon);
    } else if (icon === "10d" || icon === "10n") {
      setWicon(rain_icon);
    } else if (icon === "13d" || icon === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
