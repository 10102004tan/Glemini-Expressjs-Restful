"use strict"
const RoleModel = require('../models/role.model');
const ResourceData = require('../models/resource.model');
const { BadRequestError } = require('../cores/error.repsone');

class RbacService {
    /**
     * @description create new role
     * @param {Object} roleData - role data
     * 
     */
    static async newRole (roleData) {
        const { role_name, role_description, role_permissions=[] } = roleData;

        // check role exists by name
        const roleExists = await RoleModel.findOne({ role_name });

        if (roleExists){
            throw new BadRequestError('create role failed, role already exists!!!');
        }

        const newRole = await RoleModel.create({
            role_name,
            role_description,
            role_permissions
        })
        return newRole;
    }


    /**
     * @description create resource for role
     * 
     */
    static async createResource (resourceData){
        const { resource_name, resource_description} = resourceData;

        // check resource exists by name
        const resourceExists = await ResourceData.findOne({ resource_name });

        if (resourceExists){
            throw new BadRequestError('create resource failed, resource already exists!!!');
        }

        const newResource = await ResourceData.create({
            resource_name,
            resource_description
        })
        
        return newResource;
    }


    /**
     * @description get all roles
     * 
     */
    static async listRoles () {
        const roles = await RoleModel.aggregate([
            {
                $unwind: "$role_permissions"
            },
            {
                $lookup: {
                    from: "resources",
                    localField: "role_permissions.resource",
                    foreignField: "_id",
                    as: "resource"
                }
            },
            {
                $project:{
                    _id : 0 ,
                    role: '$role_name',
                    resource: '$resource.resource_name',
                    action: '$role_permissions.actions',
                    attributes: '$role_permissions.attributes',
                }
            },
            {
                $unwind: "$resource"
            }
        ])
        return roles
    }
}

module.exports = RbacService;