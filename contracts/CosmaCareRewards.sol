// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CosmaCareRegistry.sol";
import "./CosmaCareBooking.sol";

contract CosmaCareRewards {
    struct Reward {
        uint256 id;
        uint256 bookingId;
        address provider;
        uint256 creditAmount;
        string reasonCode;
        uint256 mintedAt;
    }

    uint256 public rewardCounter;
    mapping(uint256 => Reward) public rewards;

    event RewardMinted(
        uint256 indexed rewardId,
        uint256 indexed bookingId,
        address indexed provider,
        uint256 creditAmount,
        string reasonCode
    );

    CosmaCareRegistry public registry;
    CosmaCareBooking public booking;

    constructor(address registryAddress, address bookingAddress) {
        registry = CosmaCareRegistry(registryAddress);
        booking = CosmaCareBooking(bookingAddress);
    }

    function mintReward(
        uint256 bookingId,
        uint256 creditAmount,
        string calldata reasonCode
    ) external returns (uint256) {
        require(registry.isAdmin(msg.sender), "Only admin can mint rewards");
        require(booking.exists(bookingId), "Booking does not exist");

        CosmaCareBooking.Booking memory b = booking.getBooking(bookingId);

        rewardCounter++;
        rewards[rewardCounter] = Reward({
            id: rewardCounter,
            bookingId: bookingId,
            provider: b.provider,
            creditAmount: creditAmount,
            reasonCode: reasonCode,
            mintedAt: block.timestamp
        });

        emit RewardMinted(
            rewardCounter,
            bookingId,
            b.provider,
            creditAmount,
            reasonCode
        );
        return rewardCounter;
    }

    function getReward(uint256 rewardId) external view returns (Reward memory) {
        return rewards[rewardId];
    }
}
