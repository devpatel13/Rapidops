export type ErrorState = {
  status: Number;
  message: String | undefined;
};

export type ForecastList = {
  key: number;
  date: string;
  weatherIcon: string;
  cityName: string;
  stateName: string;
  temp: string;
  feelsLike: string;
  maxTemp: string;
  minTemp: string;
  weather: string;
  humidity: string;
  wind: string;
};
