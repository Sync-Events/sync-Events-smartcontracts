require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      // change private key
      accounts:['655b640903509b6403e297106a0c8e160fdc3e740aea07f9493db38d6e7dc75c']
    }
  },
};
