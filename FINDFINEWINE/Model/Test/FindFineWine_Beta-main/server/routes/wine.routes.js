import express from 'express';

import { getWines, getRedWines, getWhiteWines , getRoseWines} from '../controllers/wine.controller.js';

const router = express.Router();

router.get('/wines', getWines);
router.get('/red', getRedWines);
router.get('/white', getWhiteWines);
router.get('/rose', getRoseWines);

export default router;
