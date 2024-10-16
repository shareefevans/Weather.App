import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class WeatherObject implements Coordinates {
  city: string;
  date: string;
  temperature: number;
  tempF: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  iconDescription: string;
  lat: number;
  lon: number;

  constructor(data: any) {
    this.city = data.name || '';
    this.date = new Date(data.dt * 1000).toLocaleDateString();
    this.temperature = data.main.temp;
    this.tempF = (this.temperature * 9) / 5 + 32;
    this.humidity = data.main.humidity;
    this.windSpeed = data.wind.speed;
    this.icon = data.weather[0].icon;
    this.iconDescription = data.weather[0].description;
    this.lat = data.coord.lat;
    this.lon = data.coord.lon;
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
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
      );
      const locationData = await response.json();
      if (!Array.isArray(locationData) || locationData.length === 0) {
        throw new Error('No location data found');
      }
      return this.destructureLocationData(locationData[0]);
    } catch (error) {
      console.error('Error fetching location data:', error);
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
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const weatherData = await response.json();
    if (!weatherData || typeof weatherData !== 'object' || !weatherData.main) {
      throw new Error('invalid weather data');
    }
    return weatherData;
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any): WeatherObject {
  //   return new WeatherObject(response);
  // }
  private parseCurrentWeather(response: any): WeatherObject {
    if (!response || typeof response !== 'object' || !response.main) {
      throw new Error('Invalid weather data received');
    }
    return new WeatherObject(response);
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(
    currentWeather: WeatherObject,
    weatherData: any[]
  ) {
    const forecast: WeatherObject[] = [currentWeather];
    weatherData.forEach((data: any) => {
      if (data) {
        forecast.push(new WeatherObject(data));
      }
    });
    return forecast;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;

    // Check if coordinates are fetched properly
    const coordinates = await this.fetchAndDestructureLocationData();
    if (!coordinates || !coordinates.lat || !coordinates.lon) {
      throw new Error('Coordinates are undefined or invalid');
    }
    console.log('Coordinates:', coordinates); // Debugging

    const weatherData = await this.fetchWeatherData(coordinates);
    if (!weatherData || typeof weatherData !== 'object') {
      throw new Error('Weather data is undefined or invalid');
    }
    console.log('Weather Data:', weatherData); // Debugging

    const currentWeather = this.parseCurrentWeather(weatherData);
    if (!currentWeather) {
      throw new Error('Failed to parse current weather');
    }
    console.log('Current Weather:', currentWeather); // Debugging

    return this.buildForecastArray(currentWeather, [weatherData]);
  }
}

export default new WeatherService();
