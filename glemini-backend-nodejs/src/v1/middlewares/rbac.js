"use strict"

const { AccessControl } = require("accesscontrol");
const { ForbiddenError, BadRequestError } = require("../cores/error.repsone");
// const rbac = require("./role.middleware")
const RbacService = require("../services/rbac.service");

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            const validActions = ["readOwn", "readAny", "createOwn", "createAny", "updateOwn", "updateAny", "deleteOwn", "deleteAny"];
            if (!validActions.includes(action)) {
                throw new BadRequestError("Invalid action")
            }
            const role = req.user?.user_role;

            if (!role) {
                throw new ForbiddenError("access denied!!!")
            }
            /*
            Optimize use redis to cache roles
            */
            const rbac = new AccessControl(await RbacService.listRoles()) 
            const permission = rbac.can(role)[action](resource)
            if (!permission.granted) {
                throw new ForbiddenError("access denied!!!")
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    grantAccess
}