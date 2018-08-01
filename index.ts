import * as express from 'express';
import * as Bluebird from 'bluebird';

class MonoxParser {
  constructor() {
    this.app = express();
    
    this.init();
  }
  
  private init() {
    this.app.use('/', (req, res) => {
      res.status(404).json({"msg": "Not found"});
    }
    
    this.app.get('/method', async (req, res) => {
      res.status(200).send('Coming soon');
    }
    
    this.app.listen('3000', () => Console.log('[Parser] API now listen on port 3000'));
  }
}

export default new MonoxParser();
