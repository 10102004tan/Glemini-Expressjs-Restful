'use strict';
const { CREATED, OK } = require('../cores/success.response');
const schoolService = require('../services/school.service');

class SchoolController {

    // Complete the quiz
    getAllSchools = async (req, res) => {
        const schools = await schoolService.getAllSchools();
        return new OK({
            message: 'Fetch data all schools successfully!',
            metadata: schools,
        }).send(res);
    };

}

module.exports = new SchoolController();