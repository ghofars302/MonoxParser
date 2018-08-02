declare module "*.json" {
    const value: any;
    export default value;
}

import * as express from 'express';
import * as Bluebird from 'bluebird';
import * as dotenv from 'dotenv';
import { inspect } from 'util';
import { version } from './package.json';
import { existsSync } from 'fs';

if (existsSync('./.env')) dotenv.load();

class MonoxParser {
  app: express
  constructor() { 
    this.app = express();
    this.init();
  }
  
  private init() {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).send(`MonoxParser ${version}`);
    });
    
    this.app.get('/method', async (req: express.Request, res: express.Response) => {
      res.status(200).send('Coming soon');
    });
    
    this.app.post('/eval', async (req: express.Request, res: express.Response) => {
      console.log(req)
      if (!req.headers['authorization'] || ![process.env.TOKEN1].includes(req.headers['authorization'])) return res.status(401).send('Invalid Authorization token')
      let bodyText;
     
      if (req.headers['content-type'] === 'application/json') {
          try {
              const parse = JSON.parse(req.body);
              bodyText = parse.text ? parse.text : ''
          } catch (error) {
              return res.status(400).send('Invalid body format');
          }
      }
      
      if (bodyText === '' || !bodyText) return res.status(400).send('The text must not empty');
      
      const result = await this.eval(bodyText);
      
      if (result instanceof Error) return res.status(200).json({"result": "error", "msg": result.message});
      
      return res.status(200).json({"result": "ok", "msg": inspect(result).replace(process.env.TOKEN,"TOKEN")})
    });
    
    this.app.listen('3000', () => console.log('[Parser] API now listen on port 3000'));
  }
  
  public async eval(code: string) {
    if (code === '' || code.length < 0 || !code) throw new Error('The string must not empty')
    
    try {
      const result = await eval(code);
      
      return result;
    } catch (error) {
      return error;
    }
  }
  
  public async parse(code: string, options?: object) {
    if (code === '' || code.length < 1 || !code) throw new Error('The string must not empty')
    return code; // I still working on regex thing so this still useless lol.
  }
    
}

export = new MonoxParser();
