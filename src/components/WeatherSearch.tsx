import React, { useState } from "react";
import styled from "styled-components";
import { WeaterResponse } from "../types";

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  flex: 1;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #030303;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #474646;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 10px;
`;

interface WeatherSearchProps {
  onSearch: (data: WeaterResponse) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!location.trim()) {
      setError("Please enter a location!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&query=${location}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: WeaterResponse = await response.json();

      if ("error" in data) {
        setError(data.error.info);
        onSearch(data);
      } else {
        onSearch(data);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city"
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
        <SearchButton onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </SearchButton>
      </SearchContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default WeatherSearch;
