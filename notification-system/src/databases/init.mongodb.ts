/**
 * @file init.mongodb.ts
 * @description Initializes the MongoDB connection for the notification service.
 *              Handles connection retries and logging.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
import mongoose from "mongoose";
class Database {
  private static instance: Database | null = null;

  constructor() {
    this.connect();
  }

  connect() {
    const connectString =
      process.env.PRO_DB_URL || "mongodb://localhost:27017/glemini";
    mongoose
      .connect(connectString)
      .then(() => {
        console.log("connect mongodb success");
      })
      .catch((err) => {
        console.error("failed to connect to MongoDB:", err.message);
        setTimeout(() => {
          console.log("Retrying MongoDB connection...");
          this.connect();
        }, 5000);
      });
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instance = Database.getInstance();
export default instance;
