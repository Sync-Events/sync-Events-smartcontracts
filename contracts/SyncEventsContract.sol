// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./TicketsContract.sol";

contract SyncEventsContract {
    // mapping (address=>address) public NftContractDeployedBySociety;
    mapping(address => address) public SocietyAdressOfNftContract; // nft Contract => SocietyAdress
    address admin;
    event TicketIssued(
        address indexed TicketContract,
        uint256 indexed TicketId,
        uint256 atTime
    );

    event TicketContractDeployed(
        address indexed TicketContractAddress,
        address indexed SocietyAddress,
        uint256 atTime
    );

    constructor(address _admin) {
        admin = _admin;
    }

    modifier OnlyAdmin() {
        require(msg.sender == admin, "This function can only called by Admin");
        _;
    }

    modifier OnlyAdminOrSociety(address nftContract) {
        require(
            msg.sender == admin ||
                msg.sender == SocietyAdressOfNftContract[nftContract],
            "This function can only called by Admin || Society"
        );
        _;
    }
    modifier OnlySociety(address nftContract) {
        require(
            msg.sender == SocietyAdressOfNftContract[nftContract],
            "This function can only called by Society"
        );
        _;
    }

    function deployTicketContract(
        address _societyWalletAddress,
        uint256 totalTickets,
        string memory _baseuri,
        string memory _contractName,
        string memory _symbol
    ) external OnlyAdmin {
        TicketsContract _newTicketContract = new TicketsContract(
            address(this),
            _societyWalletAddress,
            totalTickets,
            _baseuri,
            _contractName,
            _symbol
        );
        emit TicketContractDeployed(
            address(_newTicketContract),
            _societyWalletAddress,
            block.timestamp
        );
    }

    function issueTicket(
        address ticketContract,
        address to
    ) external OnlyAdmin {
        TicketsContract _ticketContract = TicketsContract(ticketContract);
        uint256 _totalSupply = _ticketContract.totalSupply();
        _ticketContract.mint(to);
        emit TicketIssued(
            ticketContract,
            _totalSupply + 1,
            block.timestamp
        );
    }
}
