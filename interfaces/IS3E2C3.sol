// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IS3E2C3 {
    function getTier(address account) external view returns (uint256);
    function recordAction(address account, bytes32 actionCode) external returns (bool);
}
