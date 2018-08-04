import * as express from 'express';
import * as Bluebird from 'bluebird';
import * as dotenv from 'dotenv';
import * as BodyParser from 'body-parser'
import { inspect } from 'util';
import { existsSync } from 'fs';

import rextester from './rextester';

const { version } = require('../package.json');

if (existsSync('.env')) dotenv.load();

const app = express();

class MonoxParser {
  constructor() { 
    this.init();
  }
  
  private init() {
    app.use(BodyParser.json({strict: false}));
      
    app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).send(`MonoxParser ${version}`);
    });
    
    app.get('/method', async (req: express.Request, res: express.Response) => {
      res.status(200).send('Coming soon');
    });
    
    app.post('/eval', async (req: express.Request, res: express.Response) => {
      if (!req.headers['authorization'] || ![process.env.TOKEN1].includes(req.headers['authorization'])) return res.status(401).send('Invalid Authorization token');

      console.log('[DEBUG] Evaluate eval with code ' + req['body'].text);
      
      const bodyText = req['body'].text ? req['body'].text : '';
      
      if (bodyText === '' || !bodyText) return res.status(400).send('The text must not empty');
      
      const result = await this.eval(bodyText);

      console.log('[DEBUG] Evaluate success');
      
      if (result instanceof Error) return res.status(200).json({"result": "error", "msg": result.message});
      
      return res.status(200).json({"result": "ok", "msg": inspect(result, { depth: 0 }).replace(process.env.TOKEN1,"TOKEN")})
    });

    app.post('/parse', async (req: express.Request, res: express.Response) => {
      if (!req.headers['authorization'] || ![process.env.TOKEN1].includes(req.headers['authorization'])) return res.status(401).send('Invalid Authorization token');
    })
    
    app.listen('3000', () => console.log('[Parser] API now listen on port 3000'));
  }
  
  async eval(code: string) {
    if (code === '' || code.length < 0 || !code) return new Error('The string must not empty')
    
    try {
      const result = await eval(code);
      
      return result;
    } catch (error) {
      return error;
    }
  }
  
  async parse(code: string, options?: object) {
    if (code === '' || code.length < 1 || !code) return new Error('The string must not empty')
    return code; // I still working on regex thing so this still useless lol.
  }
}

export = new MonoxParser();
