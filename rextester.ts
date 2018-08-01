import * as fetch from 'node-fetch';
import * as Bluebird from 'bluebird';

fetch.Promise = Bluebird;

const rex = async (language: string, code: string) => {
  if (!language) return;
}

rex.list = [];

export default rex;
