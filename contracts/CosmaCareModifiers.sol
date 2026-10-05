// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CosmaCareErrors.sol";

/// @title CosmaCareModifiers
/// @notice Universal access control modifiers for all Layer‑4 apps.
/// @dev Used by Booking, Registry, Rewards, Settlement, Governance, ServiceCatalog.

contract CosmaCareModifiers {

    mapping(address => bool) internal admins;
    mapping(address => bool) internal providers;
    mapping(address => bool) internal clients;

    // ============================
    // ADMIN MODIFIER
    // ============================
    modifier onlyAdmin() {
        if (!admins[msg.sender]) revert CosmaCareErrors.E_NOT_ADMIN();
        _;
    }

    // ============================
    // PROVIDER MODIFIER
    // ============================
    modifier onlyProvider() {
        if (!providers[msg.sender]) revert CosmaCareErrors.E_NOT_PROVIDER();
        _;
    }

    // ============================
    // CLIENT MODIFIER
    // ============================
    modifier onlyClient() {
        if (!clients[msg.sender]) revert CosmaCareErrors.E_NOT_CLIENT();
        _;
    }

    // ============================
    // GOVERNANCE MODIFIER
    // ============================
    modifier onlyGovernance(address governanceContract) {
        if (msg.sender != governanceContract) revert CosmaCareErrors.E_UNAUTHORIZED();
        _;
    }

    // ============================
    // SETTLEMENT ENGINE MODIFIER
    // ============================
    modifier onlySettlementEngine(address settlementContract) {
        if (msg.sender != settlementContract) revert CosmaCareErrors.E_UNAUTHORIZED();
        _;
    }
}

