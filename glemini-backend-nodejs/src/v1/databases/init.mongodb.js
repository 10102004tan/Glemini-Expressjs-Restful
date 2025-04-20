"use strict";
const mongoose = require("mongoose");
const { host, port, name } = require("../configs/mongodb.config");
// const colors = require("../configs/colors.config");
// const subjectService = require("../services/subject.service");
// const schoolService = require("../services/school.service");
const chalk = require("chalk");
class Database {
  constructor() {
    this.connect();
  }
  connect() {
    //const connectString = `mongodb://${host}:${port}/${name}`;
    const connectString = process.env.PRO_DB_URL;
    mongoose
      .connect(connectString)
      .then(() => {
        console.log(
          chalk.blue.bold("Glemini Backend Server"),
          chalk.green.bold("is connected to database"),
          chalk.yellow.bold(connectString)
        );
      })
      .catch((err) => {
        console.error(
          chalk.red.bold("Glemini Backend Server"),
          chalk.red.bold("failed to connect to database"),
          chalk.yellow.bold(connectString),
          chalk.red.bold(err.message)
        );
      });
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDB = Database.getInstance();
module.exports = instanceDB;
