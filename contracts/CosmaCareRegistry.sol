// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CosmaCareRoleManager.sol";

contract CosmaCareRegistry {
    struct Provider {
        address account;
        bytes32 did;
        uint256 esecScore;
        uint256 s3e2c3Tier;
        bool active;
    }

    struct Client {
        address account;
        bytes32 did;
        bool active;
    }

    mapping(address => Provider) public providers;
    mapping(address => Client) public clients;

    CosmaCareRoleManager public roles;

    event ProviderRegistered(address indexed account, bytes32 did);
    event ClientRegistered(address indexed account, bytes32 did);

    constructor(address roleManager) {
        roles = CosmaCareRoleManager(roleManager);
    }

    function isAdmin(address account) external view returns (bool) {
        return
            account == roles.superAdmin() ||
            roles.roles(account) == CosmaCareRoleManager.Role.Admin;
    }

    function registerProvider(bytes32 did) external {
        providers[msg.sender] = Provider({
            account: msg.sender,
            did: did,
            esecScore: 0,
            s3e2c3Tier: 0,
            active: true
        });
        emit ProviderRegistered(msg.sender, did);
    }

    function registerClient(bytes32 did) external {
        clients[msg.sender] = Client({
            account: msg.sender,
            did: did,
            active: true
        });
        emit ClientRegistered(msg.sender, did);
    }
}
