// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CosmaCareErrors
/// @notice Universal error definitions for all Layer‑4 apps.
/// @dev Required for consistent revert messages across Booking, Settlement, Registry, Rewards, Governance.

library CosmaCareErrors {

    // ============================
    // ACCESS CONTROL
    // ============================
    error E_UNAUTHORIZED();
    error E_INVALID_ROLE();
    error E_NOT_ADMIN();
    error E_NOT_PROVIDER();
    error E_NOT_CLIENT();

    // ============================
    // BOOKING ERRORS
    // ============================
    error E_BOOKING_NOT_FOUND();
    error E_INVALID_BOOKING_STATUS();
    error E_BOOKING_ALREADY_COMPLETED();
    error E_BOOKING_ALREADY_SETTLED();
    error E_BOOKING_ALREADY_DISPUTED();

    // ============================
    // SERVICE ERRORS
    // ============================
    error E_SERVICE_NOT_FOUND();
    error E_SERVICE_INACTIVE();

    // ============================
    // SETTLEMENT ERRORS
    // ============================
    error E_SETTLEMENT_FAILED();
    error E_INVALID_TOKEN_SYMBOL();
    error E_INVALID_AMOUNT();

    // ============================
    // DISPUTE ERRORS
    // ============================
    error E_DISPUTE_NOT_FOUND();
    error E_DISPUTE_ALREADY_RESOLVED();

    // ============================
    // REWARD ERRORS
    // ============================
    error E_REWARD_NOT_FOUND();
    error E_REWARD_ALREADY_MINTED();

    // ============================
    // GOVERNANCE ERRORS
    // ============================
    error E_POLICY_NOT_FOUND();
    error E_PROPOSAL_NOT_FOUND();
    error E_VOTE_ALREADY_CAST();
}
