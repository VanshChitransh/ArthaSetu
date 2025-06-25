const { ethers } = require('ethers');

const privateKey = '0x2bad4014be599fff3d0150d617568787410496b58ddf1d62552403863deae940';

const wallet = new ethers.Wallet(privateKey);

console.log('Derived address:', wallet.address);
