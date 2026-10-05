// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ICosmaID {
    function getDid(address account) external view returns (bytes32);
    function verifyDid(bytes32 did, address account) external view returns (bool);
}
