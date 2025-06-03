const chalk = require("chalk");
const ResourceModel = require("../../../v1/models/resource.model");
const { resources,roles } = require("../data/rbac.data");
const RoleModel = require("../../../v1/models/role.model");

const seedRbac = async () => {
    await ResourceModel.deleteMany({});
    console.log(
        chalk.yellow.bold("=>Deleting existing resources...")
    );
    await ResourceModel.insertMany(resources);
    console.log(
        chalk.green.bold("[OK]Resources seeded successfully!")
    );
    await RoleModel.deleteMany({});
    console.log(
        chalk.yellow.bold("=>Deleting existing roles...")
    );
    await RoleModel.insertMany(roles);
    console.log(
        chalk.green.bold("[OK]Roles seeded successfully!")
    );
}

module.exports = seedRbac;