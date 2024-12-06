'use strict';
const cron = require('node-cron');
const exerciseModel = require('../models/exercise.model');
const classroomModel = require('../models/classroom.model');
const { findExpoTokenByListUserId } = require('../services/expoToken.service');
const { pushNoti } = require('../services/expo.service');
const { url } = require('inspector');

// create array list store exercise was sent notification
let listExerciseSent = [];
const tickets = [];

const exerciseTask = () => {
    console.log('Starting exercise task...');
    //*/10 * * * * *
    //* * * * *
    cron.schedule('* * * * *', async () => {
        // Get all exercises that are starting in the next hour
        const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);

        try {
            const exercises = await exerciseModel.find({
                date_end: {
                    $gte: new Date(),
                    $lte: oneHourFromNow
                }
            });

            // filter list exercise that was sent notification
            console.log('List exercise sent:', listExerciseSent);
            const exercisesToSend = exercises.filter(exercise => !listExerciseSent.includes(exercise._id.toString()));
            console.log('Exercises to send:', exercisesToSend);
            exercisesToSend.forEach(async exercise => {
                // get list students in class
                const { classroom_id } = exercise;
                const { students } = await classroomModel.findById(classroom_id, { students: 1 });


                // find expo token of students
                const expoTokens = await findExpoTokenByListUserId(students);
                console.log('Expo tokens:::', expoTokens);
                // get time now and time end exercise
                const ticket = await pushNoti({
                    somePushTokens: expoTokens,
                    data: {
                        title: `Bài tập ${exercise.name} sắp kết thúc 😔`,
                        body: `Bài tập sắp đến hạn nội rồi ní ơi, hãy hoàn thành nào! 😵‍💫`,
                        url:'/(app)/notification',
                        ttl: 60*60
                    }
                });
                tickets.push(...ticket);
                listExerciseSent.push(exercise._id.toString());
            });

           

            console.log('Exercises starting in the next hour:', exercises);

        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    });

    // Reset listExerciseSent every 1 hour
    cron.schedule('0 * * * *', () => {
        console.log('Resetting listExerciseSent...');
        listExerciseSent = [];
    });
}

module.exports = exerciseTask;