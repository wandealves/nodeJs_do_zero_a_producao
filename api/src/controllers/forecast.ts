import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { Beach } from '@src/models/beache';
import { Forecast } from '@src/services/forecast';

const forecast = new Forecast();

@Controller('forecast')
export default class ForecastController {
  @Get('')
  public async getForecastLoggedUser(
    _: Request,
    response: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({});

      const forecastData = await forecast.processForecastForBeaches(beaches);

      response.status(200).send(forecastData);
    } catch (error) {
      response.status(500).send({ error: 'Something went wrong' });
    }
  }
}
