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

  
  const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  const defaultSigner = provider.getSigner();
  
  const defaultAddress = "0x13CDA1483E3dA9a39e8Dff17a4fb5A3caaa41637";


  const Lock = await hre.ethers.getContractFactory("SyncEventsContract");
  const lock = await Lock.deploy(defaultAddress);
  await lock.deployed();

  
  const syncEventContractAddress = lock.address;
  console.log(`SyncEventsContract ${syncEventContractAddress}`);

  const syncEventContract = new ethers.Contract(syncEventContractAddress, SyncEventsContractJson.abi, defaultSigner);

  console.log("testing 1");

  const admin = await syncEventContract.admin();
  console.log(admin);

  const societyWallet1 = "0xfeB5A980b684833941Dbd39C20D6EE73260D99A8";
  const totalTickets1 = 99;
  const baseuri = "uri...";

  const _newTicketContract = await syncEventContract.deployTicketContract(societyWallet1,totalTickets1,baseuri,"ticket1 contract","ticket1contract");
  const newTicketContract = await _newTicketContract.wait();
  console.log(`New ticket Address: ${newTicketContract.events[0].args[0]}`);
  const ticketAddress =  newTicketContract.events[0].args[0];

   const ticketContract = new ethers.Contract(ticketAddress, TicketContractJson.abi, defaultSigner);

   console.log(await ticketContract.name());
   console.log(await ticketContract.symbol());
   console.log(await ticketContract.maxSupply());
   console.log("SyncEventContractAddress",await ticketContract.SyncEventContractAddress());
   console.log("SyncEventContractAddress",syncEventContractAddress);
   console.log("SocietyWalletAddress",await ticketContract.SocietyWalletAddress());
   console.log("SocietyWalletAddress",societyWallet1);
   
   const _issueTickets = await syncEventContract.issueTicket(ticketAddress, "0x30A71D560eD94B70fa373DB4Dc3a7335719bbB74");
   const issueTickets = await _issueTickets.wait();
   console.log(issueTickets.events);


   const signer2 = new ethers.Wallet("43898a8802c6f9c18e3fc61bb8af1872553f598f93295aedf94c191264c895ac", provider);


  //  const syncEventContract2 = new ethers.Contract(syncEventContractAddress, SyncEventsContractJson.abi, signer2);

  //  console.log(await syncEventContract.admin());
 
  //  const _newTicketContract22 = await syncEventContract2.deployTicketContract("0xfeB5A980b684833941Dbd39C20D6EE73260D99A8",99,"uri...","ticket1 contract","ticket1contract");
  //  const newTicketContract22 = await _newTicketContract22.wait();
  //  console.log(`New ticket Address: ${newTicketContract22.events[0].args[0]}`);
  //  const ticketAddress22 =  newTicketContract22.events[0].args[0];

  //  console.log(ticketAddress22);

   

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
