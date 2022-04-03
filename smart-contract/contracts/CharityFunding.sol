// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

contract FundingCreator {
    CharityFunding[] public fundings;

    function createFunding(uint fundingGoal, uint fundingDeadline) public {
        CharityFunding charityFunding = new CharityFunding(fundingGoal, fundingDeadline, msg.sender);
        fundings.push(charityFunding);
    }

    function allFundings() public view returns (CharityFunding[] memory) {
        return fundings;
    }
}

contract CharityFunding {
    address public admin;
    uint public numberOfContributors;
    uint public raisedAmount;
    uint public minimumContribution;
    uint public goal;
    uint public deadline;

    mapping(address => uint) contributors;

    event ContributeEvent(address _sender, uint _value);

    constructor(uint _goal, uint _deadline, address _admin)  {
        goal = _goal * (1 ether);
        deadline = block.timestamp + _deadline;
        admin = _admin;

        minimumContribution = 1000 wei;
    }

    function contribute() public payable{
        require(block.timestamp < deadline, "The time is over!");
        require(msg.value >= minimumContribution, "Minimum contribution not meet!");

        if(contributors[msg.sender] == 0) {
            numberOfContributors;
        }

        contributors[msg.sender] = msg.value;
        raisedAmount += msg.value;

        emit ContributeEvent(msg.sender, msg.value);

    }

    receive() external payable {
        contribute();
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}