import fetch from 'node-fetch';
import * as Bluebird from 'bluebird';
import { raw } from 'body-parser';

fetch['Promise'] = Bluebird;

const { version } = require('../package.json');

const rextester = async function (language: string, code: string, options?: string) {
  const uriOptions = {
    method: 'POST',
    headers: {
      'User-Agent': `MonoxParser ${version}`
    }
  }

  uriOptions['qs'] = {
    'LanguageChoice': language,
    'Program': code
  }

  if (options) uriOptions['qs']['CompilerArgs'] = options;

  const rawResult = await fetch('http://rextester.com/rundotnet/api', uriOptions);
  const json = await rawResult.json();

  return json;
}

export default rextester;