// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title IBooking
/// @notice Universal booking lifecycle interface for all Layer‑4 apps
interface IBooking {
    enum BookingStatus {
        Pending,
        Confirmed,
        Completed,
        Settled,
        Closed,
        Disputed
    }

    struct Booking {
        uint256 id;
        address client;
        address provider;
        uint256 serviceId;
        uint256 scheduledAt;
        BookingStatus status;
    }

    /// @notice Canonical event shape used by Layer‑2, Layer‑3, Layer‑5
    event BookingLifecycleEvent(
        uint256 indexed bookingId,
        address indexed client,
        address indexed provider,
        BookingStatus status
        // later: bytes32 clientDid, bytes32 providerDid
    );

    function bookings(uint256 bookingId) external view returns (Booking memory);
    function exists(uint256 bookingId) external view returns (bool);
    function getBooking(uint256 bookingId) external view returns (Booking memory);
}

