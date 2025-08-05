const chalk = require("chalk");
const TeacherModel = require("../../../v1/models/teacher.model");
const { teacher } = require("../data/teacher.data");
const seedTeacher = async () => {
    await TeacherModel.deleteMany({});
    console.log(
        chalk.yellow.bold("=>Deleting existing teacher...")
    )
    await TeacherModel.create(teacher);
    console.log(
        chalk.green.bold("[OK]Teacher seeded successfully!")
    );
}

module.exports = seedTeacher;