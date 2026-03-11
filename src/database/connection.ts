/* eslint-disable no-console */
import mongoose from 'mongoose';

import { dbConnection } from '@/database/databaseConfig';

const connect = async () => {
  try {
    if (!dbConnection.url || !dbConnection.DatabaseName) {
      throw new Error('Database connection details are missing.');
    }

    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    await mongoose.connect(dbConnection.url, {
      dbName: dbConnection.DatabaseName,
    });

    mongoose.connection.once('open', () => {
      console.log('✅ Successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw new Error(
      `Database connection failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
export default connect;
