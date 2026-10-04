// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CosmaCareRegistry.sol";
import "./CosmaCareBooking.sol";

contract CosmaCareDispute {
    enum DisputeStatus {
        Open,
        UnderReview,
        Resolved,
        Rejected
    }

    struct Dispute {
        uint256 id;
        uint256 bookingId;
        address client;
        address provider;
        string reason;
        DisputeStatus status;
        string resolutionNote;
        uint256 createdAt;
        uint256 resolvedAt;
    }

    uint256 public disputeCounter;
    mapping(uint256 => Dispute) public disputes;

    event DisputeOpened(
        uint256 indexed disputeId,
        uint256 indexed bookingId,
        address indexed client,
        address provider,
        string reason
    );

    event DisputeResolved(
        uint256 indexed disputeId,
        uint256 indexed bookingId,
        address indexed resolver,
        string resolutionNote,
        DisputeStatus status
    );

    CosmaCareRegistry public registry;
    CosmaCareBooking public booking;

    constructor(address registryAddress, address bookingAddress) {
        registry = CosmaCareRegistry(registryAddress);
        booking = CosmaCareBooking(bookingAddress);
    }

    function openDispute(
        uint256 bookingId,
        string calldata reason
    ) external returns (uint256) {
        require(booking.exists(bookingId), "Booking does not exist");

        (address client, address provider, , , ) = booking.getBooking(bookingId);
        require(msg.sender == client, "Only client can open dispute");

        disputeCounter++;
        disputes[disputeCounter] = Dispute({
            id: disputeCounter,
            bookingId: bookingId,
            client: client,
            provider: provider,
            reason: reason,
            status: DisputeStatus.Open,
            resolutionNote: "",
            createdAt: block.timestamp,
            resolvedAt: 0
        });

        emit DisputeOpened(disputeCounter, bookingId, client, provider, reason);
        return disputeCounter;
    }

    function resolveDispute(
        uint256 disputeId,
        string calldata resolutionNote,
        DisputeStatus status
    ) external {
        require(registry.isAdmin(msg.sender), "Only admin can resolve");

        Dispute storage d = disputes[disputeId];
        require(d.status == DisputeStatus.Open || d.status == DisputeStatus.UnderReview, "Invalid status");

        d.status = status;
        d.resolutionNote = resolutionNote;
        d.resolvedAt = block.timestamp;

        emit DisputeResolved(disputeId, d.bookingId, msg.sender, resolutionNote, status);
    }

    function getDispute(uint256 disputeId) external view returns (Dispute memory) {
        return disputes[disputeId];
    }
}

