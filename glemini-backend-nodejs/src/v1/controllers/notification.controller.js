'use strict';

const { OK } = require('../cores/success.response');
const {
  updateStatusNotificationService,
  sendNotificationAdminService,
  readAll,
} = require('../services/notification.service');

class NotificationController {
  // update
  async updateStatusNotification(req, res) {
    return new OK({
      message: 'Update status notification success',
      data: await updateStatusNotificationService(req.body),
    }).send(res);
  }

  async sendNotificationAdmin(req, res) {
    console.log(req.body);
    return new OK({
      message: 'Send notification ok',
      metadata: await sendNotificationAdminService(req.body),
    }).send(res);
  }

  // read all
  async readAll(req, res) {
    console.log('req.user', req.user);
    return new OK({
      message: 'Read all notification success',
      data: await readAll(req.user.user_id),
    }).send(res);
  }
}

module.exports = new NotificationController();
