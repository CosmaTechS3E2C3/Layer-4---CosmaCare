// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CosmaCareRoleManager.sol";
import "./CosmaCarePolicyRegistry.sol";

contract CosmaCareGovernance {
    enum ProposalStatus {
        Pending,
        Active,
        Passed,
        Failed,
        Executed
    }

    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        string policyKey;
        string policyValue;
        bool policyActive;
        uint256 yesVotes;
        uint256 noVotes;
        ProposalStatus status;
        uint256 createdAt;
        uint256 endsAt;
    }

    uint256 public proposalCounter;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    CosmaCareRoleManager public roles;
    CosmaCarePolicyRegistry public policies;

    event ProposalCreated(uint256 indexed id, address indexed proposer);
    event Voted(uint256 indexed id, address indexed voter, bool support);
    event ProposalStatusChanged(uint256 indexed id, ProposalStatus status);

    constructor(address roleManager, address policyRegistry) {
        roles = CosmaCareRoleManager(roleManager);
        policies = CosmaCarePolicyRegistry(policyRegistry);
    }

    function createProposal(
        string calldata title,
        string calldata description,
        string calldata policyKey,
        string calldata policyValue,
        bool policyActive,
        uint256 durationSeconds
    ) external returns (uint256) {
        require(
            roles.hasRole(msg.sender, CosmaCareRoleManager.Role.Admin) ||
                roles.hasRole(msg.sender, CosmaCareRoleManager.Role.Auditor),
            "Not allowed to propose"
        );

        proposalCounter++;
        uint256 id = proposalCounter;

        proposals[id] = Proposal({
            id: id,
            proposer: msg.sender,
            title: title,
            description: description,
            policyKey: policyKey,
            policyValue: policyValue,
            policyActive: policyActive,
            yesVotes: 0,
            noVotes: 0,
            status: ProposalStatus.Active,
            createdAt: block.timestamp,
            endsAt: block.timestamp + durationSeconds
        });

        emit ProposalCreated(id, msg.sender);
        return id;
    }

    function vote(uint256 id, bool support) external {
        Proposal storage p = proposals[id];
        require(p.status == ProposalStatus.Active, "Not active");
        require(block.timestamp <= p.endsAt, "Voting ended");
        require(!hasVoted[id][msg.sender], "Already voted");

        hasVoted[id][msg.sender] = true;

        if (support) p.yesVotes++;
        else p.noVotes++;

        emit Voted(id, msg.sender, support);
    }

    function finalize(uint256 id) external {
        Proposal storage p = proposals[id];
        require(p.status == ProposalStatus.Active, "Not active");
        require(block.timestamp > p.endsAt, "Voting not ended");

        if (p.yesVotes > p.noVotes) {
            p.status = ProposalStatus.Passed;
        } else {
            p.status = ProposalStatus.Failed;
        }

        emit ProposalStatusChanged(id, p.status);
    }

    function execute(uint256 id) external {
        Proposal storage p = proposals[id];
        require(p.status == ProposalStatus.Passed, "Not passed");

        policies.setPolicy(p.policyKey, p.policyValue, p.policyActive);
        p.status = ProposalStatus.Executed;

        emit ProposalStatusChanged(id, p.status);
    }
}
