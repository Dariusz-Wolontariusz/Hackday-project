import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
dotenv.config()
import MD5 from 'crypto-js/md5.js'

const API_URL = process.env.BASE_URL
const app = express();
const baseUrl = `${API_URL}/v1/public/characters`
const port = process.env.PORT;
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const ts = new Date().getTime();

 
const createHash = (ts, privateKey, publicKey) => {
  return MD5(ts + privateKey + publicKey).toString()
}
const hash = createHash(ts, privateKey, publicKey)

const url = `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`

app.get('/api', (req, res) => {
  console.log(ts, hash)
    const options = {
      Url: API_URL,
      Method: 'GET',
      Params: {
        apikey: publicKey,
        hash: hash,
        ts: ts
      },
      Headers: {
        Accept: '*/*'
      }
    };
    // });

    fetch(url, options)
      .then(res => res.json())
      .then(data => res.send(data.data))
      .catch(err => console.error('error:' + err));
})

app.get('/api/:character', (req, res) => {
    const options = {
      Url: API_URL,
      Method: 'GET',
      Params: {
        apikey: publicKey,
        hash: hash,
        ts: ts
      },
      Headers: {
        Accept: '*/*'
      }
    };
    const urlChar = `${baseUrl}?name=${req.params.character}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    https://gateway.marvel.com:443/v1/public/characters?name=deadpool&apikey=86381f87861421750d65827f3119a252&hash=3a9a180025dab8f807fd8b4bfda49b1a&ts=1668089245618

    fetch(urlChar, options)
      .then(res => res.json())
      .then(data => res.json(data.data.results[0]))
      .catch(err => console.error('error:' + err));
})

app.listen(port,() => {
  console.log(`Listening to the port ${port}`);
});