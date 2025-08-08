"use strict";

const findRoleByName = async (roleName) => {
  return await roleModel.findOne({ name: roleName }).lean();
}

module.exports = {
  findRoleByName
};