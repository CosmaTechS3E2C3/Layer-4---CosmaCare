// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CosmaCareRegistry
/// @notice Registry for providers and clients, bound to CosmaID + S3E2C3 + ESEC
contract CosmaCareRegistry {
    struct Provider {
        address account;
        bytes32 did;          // CosmaID DID
        uint256 esecScore;    // economic score
        uint256 s3e2c3Tier;   // behavioral tier
        bool active;
    }

    struct Client {
        address account;
        bytes32 did;
        bool active;
    }

    mapping(address => Provider) public providers;
    mapping(address => Client) public clients;

    event ProviderRegistered(address indexed account, bytes32 did);
    event ClientRegistered(address indexed account, bytes32 did);

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

