'use strict';
const mongoose = require('mongoose');
const {host,port,name} = require('../configs/mongodb.config');
const colors = require('../configs/colors.config');
class Database {
    constructor(){
        this.connect();
    }

    connect(){
        const connectString = `mongodb://${host}:${port}/${name}`;
        mongoose.connect(connectString).then(()=>{
            console.log(colors.bg.green,`MongoDB ${name} connection successful ☕︎`,colors.reset);
            console.log();
        }).catch(err=>{
            console.log(colors.fg.white,colors.bg.red,"Error while connecting to database: ", err.message,colors.reset);
        });
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceDB = Database.getInstance();
module.exports = instanceDB;