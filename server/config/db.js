import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async (retries = 3) => {
    if (cached.conn) {
        console.log('✅ Using cached MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // Serverless-optimized settings
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,
            minPoolSize: 2,
            maxIdleTimeMS: 10000,
            // Connection reliability
            retryWrites: true,
            retryReads: true,
            w: 'majority'
        };

        if (!process.env.MONGODB_URI) {
            throw new Error('❌ MONGODB_URI environment variable is not defined');
        }

        console.log('🔄 Attempting to connect to MongoDB...');

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('✅ New MongoDB connection established successfully');
                console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
                return mongoose;
            })
            .catch((error) => {
                console.error('❌ MongoDB connection error:', error.message);
                cached.promise = null;
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        cached.promise = null;
        
        // Retry logic with exponential backoff
        if (retries > 0) {
            console.log(`🔄 Retrying connection... (${retries} attempts remaining)`);
            const delay = (4 - retries) * 1000; // 1s, 2s, 3s delays
            await new Promise(resolve => setTimeout(resolve, delay));
            return connectDB(retries - 1);
        }
        
        console.error('❌ Failed to connect to MongoDB after all retries');
        console.error('Error details:', e.message);
        throw e;
    }
};

export default connectDB;
