import { Server } from "@overnightjs/core";
import { Application } from "express";
import bodyParser from "body-parser";

import ForecastController from "./controllers/forecast";
import "./util/module-alias";

export class SetupServer extends Server {
  constructor(private port: number = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.stupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private stupControllers(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
