const chalk = require("chalk");
const SchoolModel = require("../../../v1/models/school.model");
const { 
    colleges,
    universities,
    universitiesV2,
    universitiesV3,
    universitiesV4,
    universitiesV5,
    universitiesV6,
    universitiesV7
 } = require("../data/school.data");


const seedSchools = async () => {
    await SchoolModel.deleteMany({});
    console.log(
        chalk.yellow.bold("=>Deleting existing school...")
    );
    await SchoolModel.insertMany([
        ...colleges,
        ...universities,
        ...universitiesV2,
        ...universitiesV3,
        ...universitiesV4,
        ...universitiesV5,
        ...universitiesV6,
        ...universitiesV7
    ]);
    console.log(
        chalk.green.bold("[OK]School seeded successfully!")
    );
}

module.exports = seedSchools;