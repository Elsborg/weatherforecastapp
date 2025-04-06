export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    feelslike: number;
    humidity: number;
    wind_speed: number;
  };
}

export interface WeatherError {
  error: {
    info: string;
  };
}

export type WeaterResponse = WeatherData | WeatherError;
