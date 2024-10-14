// using tool called router from express and creating a new router
import { Router } from 'express';
const router = Router();

// import pre-defined routes from a file name index.js in the api folder
// import pre-defined routes from file name htmlRoutes.js
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

// tells router to use the apiRoutes when a request starts with /api
// tells use to use htmlRoutes for root path / + things after it
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

// make it available for other parts of app
export default router;
