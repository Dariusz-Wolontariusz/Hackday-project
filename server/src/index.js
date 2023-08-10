import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
dotenv.config()
import MD5 from 'crypto-js/md5.js'

const API_URL = process.env.BASE_URL
const app = express()
const baseUrl = `${API_URL}/v1/public/characters`
const port = process.env.PORT
const publicKey = process.env.PUBLIC_KEY
const privateKey = process.env.PRIVATE_KEY
const ts = new Date().getTime()

const createHash = (ts, privateKey, publicKey) => {
  return MD5(ts + privateKey + publicKey).toString()
}
const hash = createHash(ts, privateKey, publicKey)

const url = `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`

// Validatation and ensuring required env variables are set
if (!API_URL || !port || !publicKey || !privateKey) {
  console.error('One or more required environmental variables are missing.')
  process.exit(1)
}

app.get('/api', async (req, res) => {
  console.log(ts, hash)
  const options = {
    url: API_URL,
    method: 'GET',
    params: {
      apikey: publicKey,
      hash: hash,
      ts: ts,
    },
    headers: {
      Accept: '*/*',
    },
  }
  // });

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    res.send(data.data)
  } catch (err) {
    console.error('error:' + err)
    res.status(500).send('Internal Server Error')
  }

  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((data) => res.send(data.data))
  //   .catch((err) => console.error('error:' + err))
})

app.get('/api/:character', async (req, res) => {
  const options = {
    url: API_URL,
    method: 'GET',
    params: {
      apikey: publicKey,
      hash: hash,
      ts: ts,
    },
    headers: {
      Accept: '*/*',
    },
  }

  //simplified urlChar
  const characterName = req.params.character
  const urlChar = `${url}&name=${characterName}`

  // const urlChar = `${baseUrl}?name=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
  //gateway.marvel.com:443/v1/public/characters?name=deadpool&apikey=86381f87861421750d65827f3119a252&hash=3a9a180025dab8f807fd8b4bfda49b1a&ts=1668089245618

  try {
    const response = await fetch(urlChar, options)
    const data = await response.json()
    res.send(data.data)
  } catch (err) {
    console.error()
    'error:' + err
    res.status(500).send('Internal Server Error')
  }

  // https: fetch(urlChar, options)
  //   .then((res) => res.json())
  //   .then((data) => res.json(data.data.results[0]))
  //   .catch((err) => console.error('error:' + err))
})

app.listen(port, () => {
  console.log(`Listening to the port ${port}`)
  // console.log('Darek loguje:', ts, hash, url)
})
