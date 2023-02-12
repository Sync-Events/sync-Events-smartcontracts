require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      // change private key
      accounts:['655b640903509b6403e297106a0c8e160fdc3e740aea07f9493db38d6e7dc75c']
    },
    mumbai:{
      url:"https://rpc-mumbai.maticvigil.com/",
      accounts:["695852bea31a5ea016ed48145d87b51bbefbd639609a3a77188253abf5938ff9"]
    },
  },
  etherscan:{
    apiKey: {
      polygonMumbai:"EKR994ER4GXPP7H1MJWEXB7HBN5A8FQ5QW"
    }
}
};
