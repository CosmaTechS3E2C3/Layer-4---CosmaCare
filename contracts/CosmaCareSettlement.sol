// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CosmaCareSettlement
/// @notice Handles payouts, platform fees, partner shares, burn/treasury split
contract CosmaCareSettlement {
    struct SettlementConfig {
        uint16 providerShareBps;  // e.g. 7000 = 70%
        uint16 platformShareBps;  // e.g. 2000 = 20%
        uint16 partnerShareBps;   // e.g. 500  = 5%
        uint16 burnShareBps;      // e.g. 500  = 5%
    }

    SettlementConfig public config;

    event SettlementExecuted(
        uint256 bookingId,
        uint256 totalAmount,
        uint256 providerAmount,
        uint256 platformAmount,
        uint256 partnerAmount,
        uint256 burnAmount
    );

    constructor() {
        config = SettlementConfig({
            providerShareBps: 7000,
            platformShareBps: 2000,
            partnerShareBps: 500,
            burnShareBps: 500
        });
    }

    function settleBooking(
        uint256 bookingId,
        uint256 totalAmount,
        address provider,
        address platform,
        address partner,
        address burnAddress
    ) external {
        uint256 providerAmount = (totalAmount * config.providerShareBps) / 10000;
        uint256 platformAmount = (totalAmount * config.platformShareBps) / 10000;
        uint256 partnerAmount = (totalAmount * config.partnerShareBps) / 10000;
        uint256 burnAmount = (totalAmount * config.burnShareBps) / 10000;

        // Here you’d call CosmaCoin/SpotCoin transfer functions via Layer2
        // e.g. ICosmaCoin.transfer(provider, providerAmount);

        emit SettlementExecuted(
            bookingId,
            totalAmount,
            providerAmount,
            platformAmount,
            partnerAmount,
            burnAmount
        );
    }
}

