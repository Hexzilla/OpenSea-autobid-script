const axios = require('axios')

const API_KEY = process.env.API_KEY;//'007dd1cd8a3c4abea126d87e40b4a49e';

const config = {
  headers: {
    'X-API-KEY': API_KEY,
  }
}

export const collections = (offset, limit) => {
  axios
    .get(`https://api.opensea.io/api/v1/collections?offset=${offset}&limit=${limit}`)
    .then((res) => {
      return res.data;
    })
    .catch(console.error)
}

export const singleCollection = (slug) => {
  axios
    .get(`https://api.opensea.io/api/v1/collection/${slug}`, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch(console.error)
}

export const singleAsset = (assetContractAddress, tokenId) => {
  axios
    .get(`https://api.opensea.io/api/v1/asset/${assetContractAddress}/${tokenId}/?include_orders=false`, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch(console.error)
}

export const assets = (collection) => {
  axios
    .get(`https://api.opensea.io/api/v1/assets?collection_slug=${collection}`, config)
    .then((res) => {
      return res.data;
    })
    .catch(console.error)
}