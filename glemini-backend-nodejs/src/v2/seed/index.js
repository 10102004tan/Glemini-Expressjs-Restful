"use strict"
const seedRbac = require('./seeders/rbac.seeder');
const seedTeacher = require('./seeders/teacher.seeder');
const seedUser = require('./seeders/user.seeder');
require('module-alias/register');
const chark = require('chalk');const runSeeder = async () => {
    try {
        require('@v1/databases/init.mongodb');
        console.log(
            chark.blue.bold('Glemini Backend Seeder'),
            chark.green.bold('is running'),
        )
        await seedRbac();
        await seedUser();
        await seedTeacher();
        console.log(
            chark.blue.bold('Glemini Backend Seeder'),
            chark.green.bold('has completed successfully'),
        );
         // await seedSchool();
         // await seedSubject();
         // await seedClass();
         // await seedStudent();
         // await seedTeacher();
         // await seedCourse();
         // await seedExam();
         // await seedQuestion();
         // await seedAnswer();
        process.exit(0);
    } catch (error) {
        console.error(
            chark.red.bold('Error occurred while running the seeder:'),
            error.message,
        );
        process.exit(1);
    }
}
runSeeder();