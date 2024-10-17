import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(data: any) {
    this.city = data.name || '';
    this.date = new Date(data.dt * 1000).toLocaleDateString();
    this.icon = data.weather[0].icon;
    this.iconDescription = data.weather[0].description;
    this.tempF = this.kelvinToFahrenheit(data.main.temp);
    this.windSpeed = data.wind.speed;
    this.humidity = data.main.humidity;
  }

  private kelvinToFahrenheit(kelvin: number): number {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  }
}

// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method (change city to 'query')
  private async fetchLocationData(city: string) {
    try {
      this.cityName = city;
      const url = `${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${this.apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No location found for the city name');
      }

      return this.destructureLocationData(data[0]);
    } catch (error) {
      console.error('Error fetch location data:', error);
      throw error;
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    return this.fetchLocationData(query);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const url = this.buildWeatherQuery(coordinates);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(response);
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [currentWeather];
    for (let i = 0; i < weatherData.length; i += 8) {
      const forecastDay = weatherData[i];
      const weather = new Weather(forecastDay);
      forecastArray.push(weather);
    }

    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      this.cityName = city;
      const coordinates = await this.fetchAndDestructureLocationData();
      const currentWeatherData = await this.fetchWeatherData(coordinates);
      const currentWeather = this.parseCurrentWeather(currentWeatherData);

      const forecastUrl = this.buildWeatherQuery(coordinates).replace(
        'weather',
        'forecast'
      );
      const forecastResponse = await fetch(forecastUrl);

      if (!forecastResponse.ok) {
        throw new Error(`HTTP error! status: ${forecastResponse.status}`);
      }

      const forecastData = await forecastResponse.json();
      return this.buildForecastArray(currentWeather, forecastData.list);
    } catch (error) {
      console.error('Error getting weather for city:', error);
      throw error;
    }
  }
}

export default new WeatherService();
