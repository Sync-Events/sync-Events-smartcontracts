require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      // change private key
      accounts:['e879e272a634c5dcfa3cc33de1908d07f19d134df944001842f1ef5f17d5cefd']
    }
  },
};
