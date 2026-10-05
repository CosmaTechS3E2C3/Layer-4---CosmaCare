// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICosmaSettlementToken {
    function settleTransfer(address to, uint256 amount) external returns (bool);
}
