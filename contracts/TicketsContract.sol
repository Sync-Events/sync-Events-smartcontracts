// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./TicketsContract.sol";

contract SyncEventsContract {

    // mapping (address=>address) public NftContractDeployedBySociety;
    mapping (address=>address) public SocietyAdressOfNftContract; // nft Contract => SocietyAdress
    address admin;
    event TicketIssued(
        address indexed TicketContract,
        uint256 indexed TicketId,
        uint256 atTime
        );

    event TicketContractDeployed(
        address indexed TicketContractAddress,
        uint256 indexed SocietyAddress,
        uint256 atTime
        );

    constructor (address _admin){
        admin = _admin;
    }

    modifier OnlyAdmin() {
        require(msg.sender == admin, "This function can only called by Admin");
        _;
    }

    modifier OnlyAdminOrSociety(address nftContract) {
        require(msg.sender == admin || msg.sender == SocietyAdressOfNftContract[nftContract], "This function can only called by Admin || Society");
        _;
    }
    modifier OnlySociety(address nftContract) {
        require(msg.sender == SocietyAdressOfNftContract[nftContract], "This function can only called by Society");
        _;
    }

    function deployTicketContract( ) external OnlyAdmin {
        
    }
}
