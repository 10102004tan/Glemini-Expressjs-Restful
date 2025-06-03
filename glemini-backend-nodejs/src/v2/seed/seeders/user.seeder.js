const chalk = require("chalk");
const UserModel = require("../../../v1/models/user.model");
const { users } = require("../data/user.data");
const seedUsers = async () => {
    await UserModel.deleteMany({});
    console.log(
        chalk.yellow.bold("=>Deleting existing users...")
    )
    await UserModel.insertMany(users);
    console.log(
        chalk.green.bold("[OK]Users seeded successfully!")
    );
}

module.exports = seedUsers;