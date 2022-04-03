const Web3 = require('web3')
const opensea = require('opensea-js')
const axios = require('axios')

const API_KEY = process.env.API_KEY;//'007dd1cd8a3c4abea126d87e40b4a49e';

const config = {
  headers: {
    'X-API-KEY': API_KEY,
  }
}

const accountAddress = process.env.ACCOUNT_ADDRESS;

const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io');
const seaport = new opensea.OpenSeaPort(provider, {
  networkName: opensea.Network.Main,
  apiKey: API_KEY
})

const collections = async (offset, limit) => {
  return axios
    .get(`https://api.opensea.io/api/v1/collections?offset=${offset}&limit=${limit}`)
    .then((res) => {
      return res.data;
    })
    .catch(console.error)
}

const assets = async (collection, cursor = '') => {
  return axios
    .get(`https://api.opensea.io/api/v1/assets?collection_slug=${collection}&cursor=${cursor}`, config)
    .then((res) => {
      return res.data;
    })
    .catch(console.error)
}

const singleCollection = (slug) => {
  axios
    .get(`https://api.opensea.io/api/v1/collection/${slug}`, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch(console.error)
}

const singleAsset = (assetContractAddress, tokenId) => {
  axios
    .get(`https://api.opensea.io/api/v1/asset/${assetContractAddress}/${tokenId}/?include_orders=false`, config)
    .then((res) => {
      console.log(res.data);
    })
    .catch(console.error)
}

const createBuyOrder = async (asset, price) => {
  try {
    return await seaport.createBuyOrder({
      asset: {
        tokenId: asset.tokenId,
        tokenAddress: asset.tokenAddress,
        schemaName: asset.schema_name // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
      },
      accountAddress,
      // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
      startAmount: price,
    })
  } catch (err) {
    console.error(err)
  }
}

const createBundleBuyOrder = async (assets, price) => {
  try {
    return await seaport.createBundleBuyOrder({
      assets,
      accountAddress,
      startAmount: price,
      //Optional expiration time for the order, in Unix time (seconds):
      //expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24) // One day from now
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  collections,
  assets,
  singleCollection,
  singleAsset,
  createBuyOrder,
  createBundleBuyOrder,
};
