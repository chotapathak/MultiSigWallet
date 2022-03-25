// SPDX-License-Identifier: MIT

pragma solidity >=0.8.3;

contract MultiSigWallet {
    // limiting owner storage
    uint constant public MAX_OWNER_COUNT = 50;

    // important events
    event Confirmation(address indexed sender, uint indexed transactionId);
    event Revocation(address indexed sender, uint indexed transactionId);
    event Submission(uint indexed transactionId);
    event Execution(uint indexed transferId);
    event Deposit(address indexed sender, uint value);
    event OwnerAddition(address indexed owner);
    event OwnerRemoval(address indexed owner);
    event RequirementChange(uint required);

    address[] public owners;
    uint public required;
    uint public transactionCount;

    struct Transaction {
      address destination;
      uint value;
      bytes data;
      bool executed;
    }
    mapping(uint => Transaction) public transactions;

    modifier onlyWallet() 
    {
      require(msg.sender != address(this)); 
            revert();
       _;
    }
//
    mapping(address => bool) isOwner;
    modifier ownerDoesNotExist(address owner) 
    {
      if(isOwner[owner]) revert();
      _;
    }

    modifier ownerExists(address owner) 
    {
      if (!isOwner[owner])
      _;
    }
//    mapping(uint => Transaction) public transactions;
    modifier trasactionExists(uint transactionId) 
    {
      if(transactions[transactionId].destination == address(0)) revert();
      _;
    }
//
    mapping(uint => mapping(address => bool)) public confirmations;

    modifier confirmed(uint transactionId, address owner) 
    {
      if (!confirmations[transactionId][owner]) revert();
      _;
    }

    modifier notConfirmed(uint transactionId, address owner)
    {
        if(confirmations[transactionId][owner]) revert();
        _;
    }

    modifier notExecuted(uint transactionId)
    {
        if(transactions[transactionId].executed) 
            revert();
        _;
    }

    modifier notNull(address _address)
    {
        require(_address == address(0)); revert();
        _;
    }

    modifier validRequirement(uint ownerCount, uint _required)
    {
        if(ownerCount > MAX_OWNER_COUNT || _required > ownerCount ||
                _required == 0 || ownerCount == 0 ) revert();
        _;
    }
    // fallback function allows to deposit ether
    fallback() external payable
    {
        if(msg.value > 0)
        emit Deposit(msg.sender, msg.value);
    }
    // Contract constructor sets initial owners and required number of confirmation
    // _owners list of initial owners.
    // _required number of required confirmations
    constructor(address[] memory _owners, uint _required)
        
        validRequirement(_owners.length, _required)
        {
            for (uint i = 0; i < _owners.length; i++) 
            {
                if(isOwner[_owners[i]] || _owners[i] == address(0))
                    revert();
                isOwner[_owners[i]] = true;    
            }
            owners = _owners;
            required = _required;
        }
    // This add new owner. then send Transaction should be sent owner Address of new owner
    function addOwner(address owner) public onlyWallet ownerDoesNotExist(owner)
        notNull(owner)
        validRequirement(owners.length + 1, required)
        {
            isOwner[owner] = true;
            owners.push(owner);
            emit OwnerAddition(owner);
        }

    // allows to change number of required confirmations
        function changeRequirement(uint _required) 
            public
            onlyWallet 
            validRequirement(owners.length, _required)
        {
            required = _required;
            RequirementChange(_required);
        }   
    // Remove Owner
    function removeOwner(address owner)
        public
        onlyWallet
        ownerExists(owner)
        {
            isOwner[owner] = false;
            for(uint i=0; i<owners.length - 1; i++)
                if(owners[i] == owner) {
                    owners[i] = owners[owners.length - 1];
                    break;
                }
            owners.length -= 1;
            if (required > owners.length)
                changeRequirement(owners.length);
            emit OwnerRemoval(owner);        
        }         
}