const { network } = require("hardhat");

require("@nomicfoundation/hardhat-toolbox");

require("dotenv").cofig();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.24",
  networks:{
    goerli:{
      url:GOERLI_URL,
      accounts:[PRIVATE_KEY],
    }
  }
};
