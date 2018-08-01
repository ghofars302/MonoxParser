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
    })
    
    this.app.get('/method', async (req, res) => {
      res.status(200).send('Coming soon');
    })
    
    this.app.post('/eval', async (req, res) => {
      if (!res.headers.Authorization || ![process.env.TOKEN1].includes(req.headers.Authorization)) return res.status(401).send('Invalid Authorization token')
      let bodyText;
     
      if (res.headers['Content-Type'] === 'application/json') {
          bodyText = req.body ? (req.body.text ? res.body.text : '') : undefined;
      }
      
      if (bodyText === '' || !bodyText) return res.status(400).send('Thr text must not empty');
    })
    
    this.app.listen('3000', () => Console.log('[Parser] API now listen on port 3000'));
  }
  
  public async eval(code: string) {
    try {
      const result = await eval(code);
      
      return result;
    } catch (error) {
      throw error
    }
  }
  
  public async parse(code: string) {
    if (code === '' || code.length < 1) throw new Error('The string must not empty')
    
  }
    
}

export default new MonoxParser();
