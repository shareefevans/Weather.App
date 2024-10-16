import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
// import HistoryService from '../../service/weatherService.js';
import weatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

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
    await historyService.addCity(city);
    return res.json(weatherData);
  } catch (err) {
    console.error('error fetching data:', err);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const history = await historyService.getCities();
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
    await historyService.removeCity(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting city from history:', err);
    res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;
