// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketsContract is ERC721Enumerable {
    using Strings for uint256;
    
    string public __Uri;
    string public _baseUriExtention = ".json";
    uint256 public maxSupply; 

    address SyncEventContractAddress;
    address SocietyWalletAddress;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);
    

    constructor(address _syncEventContract,address _societyWalletAddress, uint256 totalTickets, string memory _baseuri,string memory _contractName,string memory _symbol) ERC721(_contractName, _symbol) {
      __Uri = _baseuri;
      SyncEventContractAddress = _syncEventContract;
      maxSupply = totalTickets;
      SocietyWalletAddress = _societyWalletAddress;
    }

    modifier onlySyncEventContract() {
        require(SyncEventContractAddress == msg.sender, "The caller is another contract");
        _;
    }

    modifier onlySociety() {
        require(SocietyWalletAddress == msg.sender, "The caller is another contract");
        _;
    }

    function mint(address to) public onlySyncEventContract {
        uint256 _total = totalSupply();
        require(_total < maxSupply, "Reached max supply");
        _safeMint(to, _total + 1);
    }

    
    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)  override internal {
        super._beforeTokenTransfer(from, to, tokenId,batchSize);
        require(from == address(0) || to == address(0), "Not allowed to transfer token");
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) override internal {
        super._afterTokenTransfer(from, to, tokenId,batchSize);

        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        } 
    }

    
    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return __Uri;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);
        return bytes(__Uri).length > 0 ? string(abi.encodePacked(__Uri)) : "";
    }
}