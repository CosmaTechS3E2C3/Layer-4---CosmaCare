// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICosmaESEC {
    function getScore(address account) external view returns (uint256);
    function mintEquity(address account, uint256 amount) external returns (bool);
}
