// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CosmaCareEvents
/// @notice Universal event definitions for all Layer‑4 apps.
/// @dev Required by Layer‑1 lifecycle, Layer‑2 protocols, Layer‑3 Supabase, Layer‑5 analytics.

contract CosmaCareEvents {

    // ============================
    // BOOKING LIFECYCLE EVENTS
    // ============================
    event BookingLifecycleEvent(
        uint256 indexed bookingId,
        address indexed client,
        address indexed provider,
        string status,
        bytes32 clientDid,
        bytes32 providerDid,
        uint256 timestamp
    );

    // ============================
    // DISPUTE EVENTS
    // ============================
    event DisputeOpened(
        uint256 indexed disputeId,
        uint256 indexed bookingId,
        string raisedBy,
        string reason,
        uint256 timestamp
    );

    event DisputeResolved(
        uint256 indexed disputeId,
        uint256 indexed bookingId,
        string resolutionNote,
        uint256 timestamp
    );

    // ============================
    // REWARD EVENTS
    // ============================
    event RewardMinted(
        uint256 indexed rewardId,
        uint256 indexed bookingId,
        address indexed provider,
        uint256 amount,
        string tokenSymbol,
        string reasonCode,
        uint256 timestamp
    );

    // ============================
    // SETTLEMENT EVENTS
    // ============================
    event SettlementExecuted(
        uint256 indexed settlementId,
        uint256 indexed bookingId,
        uint256 totalAmount,
        uint256 providerAmount,
        uint256 platformAmount,
        uint256 partnerAmount,
        uint256 burnAmount,
        string tokenSymbol,
        uint256 timestamp
    );

    // ============================
    // PROFILE EVENTS
    // ============================
    event ProfileUpdated(
        address indexed user,
        bytes32 did,
        string role,
        uint256 esecScore,
        uint256 s3e2c3Tier,
        uint256 timestamp
    );

    // ============================
    // GOVERNANCE EVENTS
    // ============================
    event GovernanceProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        bytes32 proposerDid,
        string title,
        uint256 timestamp
    );

    event GovernanceVoteCast(
        uint256 indexed voteId,
        uint256 indexed proposalId,
        address indexed voter,
        bytes32 voterDid,
        bool support,
        uint256 timestamp
    );

    event GovernancePolicyUpdated(
        uint256 indexed policyId,
        string key,
        string value,
        bool active,
        address updatedBy,
        uint256 timestamp
    );
}
