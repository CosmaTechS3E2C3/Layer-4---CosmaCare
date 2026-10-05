// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CosmaCareRoleManager {
    enum Role {
        None,
        Admin,
        Provider,
        Auditor,
        System
    }

    mapping(address => Role) public roles;
    address public superAdmin;

    event RoleAssigned(address indexed account, Role role);
    event SuperAdminChanged(address indexed oldAdmin, address indexed newAdmin);

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Not super admin");
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == superAdmin || roles[msg.sender] == Role.Admin,
            "Not admin"
        );
        _;
    }

    constructor(address _superAdmin) {
        superAdmin = _superAdmin;
        roles[_superAdmin] = Role.Admin;
    }

    function setSuperAdmin(address newAdmin) external onlySuperAdmin {
        address old = superAdmin;
        superAdmin = newAdmin;
        roles[newAdmin] = Role.Admin;
        emit SuperAdminChanged(old, newAdmin);
    }

    function assignRole(address account, Role role) external onlyAdmin {
        roles[account] = role;
        emit RoleAssigned(account, role);
    }

    function hasRole(address account, Role role) external view returns (bool) {
        return roles[account] == role;
    }
}
