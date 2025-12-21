import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    phone: String,
    email: { type: String, required: true },
    linkedin: String,
    github: String,
    bio: String,
}, { timestamps: true });

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    cgpa: String,
    percentage: String,
    year: { type: String, required: true },
    current: { type: Boolean, default: false },
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [String],
    github: String,
    link: String,
    date: String,
    highlights: [String],
}, { timestamps: true });

const experienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    description: String,
    technologies: [String],
    highlights: [String],
}, { timestamps: true });

const skillsSchema = new mongoose.Schema({
    languages: [String],
    frameworks: [String],
    tools: [String],
    platforms: [String],
}, { timestamps: true });

const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    provider: { type: String, required: true },
    date: String,
    link: String,
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);
export const Education = mongoose.model('Education', educationSchema);
export const Project = mongoose.model('Project', projectSchema);
export const Experience = mongoose.model('Experience', experienceSchema);
export const Skills = mongoose.model('Skills', skillsSchema);
export const Certification = mongoose.model('Certification', certificationSchema);
