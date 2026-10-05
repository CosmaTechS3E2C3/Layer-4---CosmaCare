// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CosmaCareRoleManager.sol";

contract CosmaCarePolicyRegistry {
    struct Policy {
        uint256 id;
        string key;
        string value;
        bool active;
    }

    uint256 public policyCounter;
    mapping(uint256 => Policy) public policies;
    mapping(string => uint256) public keyToId;

    CosmaCareRoleManager public roles;

    event PolicySet(uint256 indexed id, string key, string value, bool active);

    constructor(address roleManager) {
        roles = CosmaCareRoleManager(roleManager);
    }

    modifier onlyAdmin() {
        require(
            roles.hasRole(msg.sender, CosmaCareRoleManager.Role.Admin) ||
                msg.sender == roles.superAdmin(),
            "Not admin"
        );
        _;
    }

    function setPolicy(
        string calldata key,
        string calldata value,
        bool active
    ) external onlyAdmin {
        uint256 id = keyToId[key];

        if (id == 0) {
            policyCounter++;
            id = policyCounter;
            keyToId[key] = id;
        }

        policies[id] = Policy({
            id: id,
            key: key,
            value: value,
            active: active
        });

        emit PolicySet(id, key, value, active);
    }

    function getPolicy(string calldata key) external view returns (Policy memory) {
        uint256 id = keyToId[key];
        require(id != 0, "Policy not found");
        return policies[id];
    }
}

