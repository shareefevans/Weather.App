import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// TODO: GET weather data from city name
// TODO: save city to search history
router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name required' });
    }
    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);
    return res.json({ currentWeather: weatherData }); // Wrap in an object with 'currentWeather' key
  } catch (err) {
    console.error('error fetching data:', err);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (err) {
    console.error('error getting search history');
    res.status(500).json({ error: 'failed to get search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting city from history:', err);
    res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;
