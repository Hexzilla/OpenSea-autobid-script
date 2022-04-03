import axios from 'axios';

const API_KEY = '007dd1cd8a3c4abea126d87e40b4a49e';

const config = {
  headers: {
    'X-API-KEY': API_KEY,
  }
}

export const collections = () => {
  axios
    .get('https://api.opensea.io/api/v1/collections?offset=0&limit=10')
    .then((res) => {
      console.log(res.data);
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

export const getAssetsByCollection = (collection) => {
  axios
    .get(`https://api.opensea.io/api/v1/assets?collection_slug=${collection}`, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch(console.error)
}