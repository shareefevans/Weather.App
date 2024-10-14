import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
// import HistoryService from '../../service/weatherService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name required' });
    }
    const weatherData = await weatherService.getWeatherForCity(city);
    // await HistoryService.addToHistory(city);
    return res.json(weatherData);
  } catch (err) {
    console.error('error fetching data:', err);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: GET search history
// router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
