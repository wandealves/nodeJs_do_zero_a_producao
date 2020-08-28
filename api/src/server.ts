import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';
import * as database from '@src/database';

import ForecastController from './controllers/forecast';
import './util/module-alias';

export class SetupServer extends Server {
  constructor(private port: number = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.stupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private stupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
