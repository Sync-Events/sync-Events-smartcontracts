// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const SyncEventsContractJson = require('../artifacts/contracts/SyncEventsContract.sol/SyncEventsContract.json')
const TicketContractJson = require('../artifacts/contracts/TicketsContract.sol/TicketsContract.json')

async function main() {


  
  const defaultAddress = "0x84e2be4caac1534601F597f674Db7Be819Ca239F";


  const Lock = await hre.ethers.getContractFactory("SyncEventsContract");
  const lock = await Lock.deploy(defaultAddress);
  await lock.deployed();

  
  const syncEventContractAddress = lock.address;
  console.log(`SyncEventsContract ${syncEventContractAddress}`);


   

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
