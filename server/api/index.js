import app from '../server.js';
import connectDB from '../config/db.js';

// Serverless function handler that ensures DB connection
export default async function handler(req, res) {
    try {
        // Ensure database connection before handling request
        await connectDB();

        // Pass request to Express app
        return app(req, res);
    } catch (error) {
        console.error('❌ Serverless function error:', error);
        return res.status(500).json({
            error: 'Database connection failed',
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
