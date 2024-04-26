import React, { useState } from "react";
import axios from "axios";
import PlaceIcon from "@mui/icons-material/Place";
import "./Dashboard.css"; 

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"bdbf20ff7cc7fa2d74c24bb767bcb7cf"}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
        setWeatherData(null);
      });
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherData();
    }
  };

  return (
    <div className="weather-container">
      <div className="card">
        <div className="card-header">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={city}
              onChange={handleChange}
              placeholder="Enter city name"
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="card-body">
          {error && <p className="error">{error}</p>}
          {weatherData && (
            <div className="place">
              <PlaceIcon />
              <h1>{weatherData.name}</h1>
            </div>
          )}
          {weatherData && (
            <div>
              <h3>Temperature: {weatherData.main.temp}°C</h3>
              <h3>Humidity: {weatherData.main.humidity}%</h3>
              <h3>Wind Speed: {weatherData.wind.speed} m/s</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
