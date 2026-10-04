// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CosmaCareServiceCatalog
/// @notice Defines services mapped to S3E2C3 service schema
contract CosmaCareServiceCatalog {
    struct Service {
        uint256 id;
        string name;
        uint256 basePrice;      // in smallest unit of SpotCoin/CosmaCoin
        bytes32 s3e2c3Code;     // behavioral mapping
        bool active;
    }

    uint256 public nextServiceId;
    mapping(uint256 => Service) public services;

    event ServiceCreated(uint256 indexed id, string name, uint256 basePrice, bytes32 s3e2c3Code);

    function createService(string memory name, uint256 basePrice, bytes32 s3e2c3Code) external {
        uint256 id = ++nextServiceId;
        services[id] = Service({
            id: id,
            name: name,
            basePrice: basePrice,
            s3e2c3Code: s3e2c3Code,
            active: true
        });
        emit ServiceCreated(id, name, basePrice, s3e2c3Code);
    }
}

