import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { Beach } from '../models/beache';
import { Forecast } from '../services/forecast';
import { authMiddleware } from '../middlewares/auth';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export default class ForecastController {
  @Get('')
  public async getForecastLoggedUser(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded?.id });
      const forecastData = await forecast.processForecastForBeaches(beaches);
      res.status(200).send(forecastData);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
}
