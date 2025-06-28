/**
 * @file server.ts
 * @description Main entry point for the notification system service.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
'use strict'

import app from './src';
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Notification system server is running on port ${PORT}`);
})

