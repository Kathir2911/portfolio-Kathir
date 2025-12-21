import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { Profile, Education, Project, Experience, Skills, Certification } from './models/schemas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function migrateData() {
    try {
        // Connect to MongoDB
        await connectDB();

        // Read existing JSON data
        const jsonData = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8');
        const data = JSON.parse(jsonData);

        console.log('📦 Starting data migration...');

        // Clear existing data
        await Promise.all([
            Profile.deleteMany({}),
            Education.deleteMany({}),
            Project.deleteMany({}),
            Experience.deleteMany({}),
            Skills.deleteMany({}),
            Certification.deleteMany({})
        ]);
        console.log('🗑️  Cleared existing data');

        // Migrate Profile
        await Profile.create(data.profile);
        console.log('✅ Profile migrated');

        // Migrate Education
        await Education.insertMany(data.education);
        console.log('✅ Education migrated');

        // Migrate Projects
        await Project.insertMany(data.projects);
        console.log('✅ Projects migrated');

        // Migrate Experience
        await Experience.insertMany(data.experience);
        console.log('✅ Experience migrated');

        // Migrate Skills
        await Skills.create(data.skills);
        console.log('✅ Skills migrated');

        // Migrate Certifications
        await Certification.insertMany(data.certifications);
        console.log('✅ Certifications migrated');

        console.log('🎉 Data migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrateData();
