// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IRegistry
/// @notice Universal identity registry interface for all Layer‑4 apps
interface IRegistry {
    function getDid(address account) external view returns (bytes32);
    function isAdmin(address account) external view returns (bool);
}

