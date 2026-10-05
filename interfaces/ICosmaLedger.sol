// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICosmaLedger {
    function anchorSettlement(
        uint256 bookingId,
        uint256 amount,
        address client,
        address provider
    ) external returns (bool);
}
