// SPDX-License-Identifier: MIT

pragma solidity >=0.8.3;
import "../contracts/IMSIG.sol";

contract MultiSigWallet is IMSIG{
    // limiting owner storage
    uint constant public MAX_OWNER_COUNT = 50;

//     // important events
    event Confirmation(address indexed sender, uint indexed transactionId);
    event Revocation(address indexed sender, uint indexed transactionId);
    event Submission(uint indexed transactionId);
    event Execution(uint indexed transferId);
    event Deposit(address indexed sender, uint value);
    event OwnerAddition(address indexed owner);
    event OwnerRemoval(address indexed owner);
    event RequirementChange(uint required);

    address[] public  owners;
    // address public override _owner;
    // uint public override required;
    // uint public override transactionCount;

    struct Transaction {
      address destination;
      uint value;
      bytes data;
      bool executed;
    }
    mapping(uint => Transaction) public transactions;

    modifier validRequirement(uint ownerCount, uint _required)
    {
        if(ownerCount > MAX_OWNER_COUNT || _required > ownerCount ||
                _required == 0 || ownerCount == 0 ) revert();
        _;
    }

// 
    modifier transactionExists(uint transactionId) 
    {
      if(transactions[transactionId].destination == address(0)) revert();
      _;
    }
// 
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

    // fallback function allows to deposit ether
    fallback() external payable
    {
        if(msg.value > 0)
        emit Deposit(msg.sender, msg.value);
    }
    // Recieve fallback function
    receive() external payable
    {
        if(msg.value > 0)
        emit Deposit(msg.sender, msg.value);
    }
    // Contract constructor sets initial owners and required number of confirmation
    // _owners list of initial owners.
    // _required number of required confirmations
    constructor(address[] memory _owners, uint _required) payable
        
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
    // // This add new owner. then send Transaction should be sent owner Address of new owner
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
            emit RequirementChange(_required);
        }   

    function delOwner(address owner) public onlyWallet {
        bool alreadyDeleted = false;
        uint ownerIndex;
        for (uint i =0; i < owners.length; i++) {
            if (owners[i] == owner) {
                alreadyDeleted = true;
                ownerIndex = i;
                break;
            }
        }
        require(alreadyDeleted == true, ' owner not detected');
        owners[ownerIndex] = owners[owners.length - 1];
        owners.pop();
        emit OwnerRemoval(owner);
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
                owners.pop();
            if (required > owners.length)
                changeRequirement(owners.length);
            emit OwnerRemoval(owner);        
        }         
    // deposit function
        uint balances;
    mapping(address => uint) balance;
    function deposit(uint amount) public payable ownerExists(_owner) {
        require(msg.value >= amount, 'deposit amount must be greater than or equal to the amount');
        require(amount > 0, 'deposit amount must be greater than 0');
        // require(msg.value > .01 ether);
        require(msg.sender == _owner, 'only main owner can deposit');
        require(balance[msg.sender] >= msg.value, 'insufficient balance');
        balance[msg.sender] = msg.value;
        emit Deposit(msg.sender, msg.value);
    }    
    //
    function addTransaction(address destination,uint value, bytes memory data) 
        internal 
        notNull(destination)
        returns (uint transactionId)
    {
        transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination:  destination,
            value: value,
            data: data,
            executed: false
        });
    } 
    //
    function submitTransaction(address destination, uint value,bytes calldata data)
        public
        returns (uint transactionId)
        {
            transactionId = addTransaction(destination,value,data);
            // confirTransaction(transactionId);

        }
    // 
    function confirmTransaction(uint transactionId) 
        public
        ownerExists(msg.sender)
        transactionExists(transactionId)
        notConfirmed(transactionId, msg.sender)
    {

    }    
}