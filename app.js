import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
// import { singleAsset, singleCollection } from './opensea.js'

// //singleAsset('0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb', 1);
// singleCollection('0xmons-xyz');


// const Web3 = require('web3')
// const opensea = require('opensea-js')

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.default.providers.HttpProvider('https://mainnet.infura.io');
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: '007dd1cd8a3c4abea126d87e40b4a49e'
})

const getAssetBalance = async () => {
  const asset = {
    tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // CryptoKitties
    tokenId: "1", // Token ID
  }
  
  const balance = await seaport.getAssetBalance({
    accountAddress: '0xFE25bCF52D3Ad8ccfdfebb0A022c03578dBBF89E', // string
    asset, // Asset
  })

  console.log('balance', balance.toNumber())
}

getAssetBalance();


