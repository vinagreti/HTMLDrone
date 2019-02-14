import * as core from 'express-serve-static-core';
import * as path from 'path';
import * as express from 'express';

export class MainRoutes {

  constructor(
    private app: core.Express
  ) {
    this.registerRoutes();
  }

  private registerRoutes() {

    this.app.use(express.static(path.join(__dirname + '/../client/')));

    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname + '/../client/index.html'));
    });

    this.app.get('/*', (req, res) => {
      res.status(404);
      res.send('no content');
    });

  }

}