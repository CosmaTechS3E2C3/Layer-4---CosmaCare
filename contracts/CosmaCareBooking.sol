// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CosmaCareBooking {
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

    uint256 public nextBookingId;
    mapping(uint256 => Booking) public bookings;

    event BookingCreated(
        uint256 indexed id,
        address indexed client,
        address indexed provider,
        uint256 serviceId,
        uint256 scheduledAt
    );
    event BookingStatusChanged(uint256 indexed id, BookingStatus status);

    function createBooking(
        address provider,
        uint256 serviceId,
        uint256 scheduledAt
    ) external {
        uint256 id = ++nextBookingId;
        bookings[id] = Booking({
            id: id,
            client: msg.sender,
            provider: provider,
            serviceId: serviceId,
            scheduledAt: scheduledAt,
            status: BookingStatus.Pending
        });

        emit BookingCreated(id, msg.sender, provider, serviceId, scheduledAt);
        emit BookingStatusChanged(id, BookingStatus.Pending);
    }

    function exists(uint256 bookingId) external view returns (bool) {
        return bookings[bookingId].id != 0;
    }

    function getBooking(uint256 bookingId) external view returns (Booking memory) {
        return bookings[bookingId];
    }

    function confirmBooking(uint256 bookingId) external {
        Booking storage b = bookings[bookingId];
        require(b.id != 0, "Booking not found");
        require(msg.sender == b.provider, "Only provider");
        b.status = BookingStatus.Confirmed;
        emit BookingStatusChanged(bookingId, BookingStatus.Confirmed);
    }

    function completeBooking(uint256 bookingId) external {
        Booking storage b = bookings[bookingId];
        require(b.id != 0, "Booking not found");
        require(msg.sender == b.provider, "Only provider");
        b.status = BookingStatus.Completed;
        emit BookingStatusChanged(bookingId, BookingStatus.Completed);
    }

    // Optional later: settleBookingStatus, closeBooking, markDisputed
}
