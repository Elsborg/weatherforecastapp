import React, { useState } from "react";
import styled from "styled-components";
import WeatherSearch from "./WeatherSearch";
import WeatherDisplay from "./WeatherDisplay";
import { WeaterResponse } from "../types";

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeaterResponse | null>(null);

  const handleSearch = (data: WeaterResponse) => {
    if (!("error" in data)) {
      setWeatherData(data);
    }
  };

  return (
    <AppContainer>
      <Title>Weather Forecast</Title>
      <WeatherSearch onSearch={handleSearch} />
      {weatherData && !("error" in weatherData) && (
        <WeatherDisplay weatherData={weatherData} />
      )}
    </AppContainer>
  );
};

export default WeatherApp;
