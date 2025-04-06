import React from "react";
import styled from "styled-components";
import { WeatherData } from "../types";

const WeatherContainer = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WeatherHeader = styled.h2`
  margin-top: 0;
  color: #333;
`;

const WeatherTime = styled.h3`
  font-size: 14px;
  color: #aba7a7;
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const WeatherIcon = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 15px;
  border-radius: 8px;
`;

const Temperature = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 18px;
  color: #666;
`;

const Details = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  width: 100%;
`;

const DetailItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6c757d;
  margin-bottom: 4px;
`;

const DetailValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
`;

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <WeatherContainer>
      <WeatherHeader>
        {weatherData.location.name}, {weatherData.location.country}
        <WeatherTime>{weatherData.location.localtime}</WeatherTime>
      </WeatherHeader>
      <WeatherInfo>
        <WeatherIcon
          src={weatherData.current.weather_icons[0]}
          alt="Weather icon"
        />
        <div>
          <Temperature>{weatherData.current.temperature}°C</Temperature>
          <Description>
            {weatherData.current.weather_descriptions[0]}
          </Description>
        </div>
      </WeatherInfo>
      <Details>
        <DetailItem>
          <DetailLabel>Feels Like</DetailLabel>
          <DetailValue>{weatherData.current.feelslike}°C</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{weatherData.current.humidity}%</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Wind</DetailLabel>
          <DetailValue>{weatherData.current.wind_speed} km/h</DetailValue>
        </DetailItem>
      </Details>
    </WeatherContainer>
  );
};

export default WeatherDisplay;
