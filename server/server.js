import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { Profile, Education, Project, Experience, Skills, Certification, Client } from './models/schemas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Note: In serverless (Vercel), connection is handled in api/index.js
// For local development, we connect below when starting the server

// Middleware
app.use(cors());
app.use(express.json());

// ============ PROFILE ENDPOINTS ============
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true });
    } else {
      profile = await Profile.create(req.body);
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ EDUCATION ENDPOINTS ============
app.get('/api/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ year: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/education', async (req, res) => {
  try {
    const newEducation = await Education.create(req.body);
    res.status(201).json(newEducation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/education/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/education/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ PROJECTS ENDPOINTS ============
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ EXPERIENCE ENDPOINTS ============
app.get('/api/experience', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/experience', async (req, res) => {
  try {
    const newExperience = await Experience.create(req.body);
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/experience/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/experience/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ SKILLS ENDPOINTS ============
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skills.findOne();
    res.json(skills || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/skills', async (req, res) => {
  try {
    let skills = await Skills.findOne();
    if (skills) {
      skills = await Skills.findByIdAndUpdate(skills._id, req.body, { new: true });
    } else {
      skills = await Skills.create(req.body);
    }
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CERTIFICATIONS ENDPOINTS ============
app.get('/api/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ date: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/certifications', async (req, res) => {
  try {
    const newCert = await Certification.create(req.body);
    res.status(201).json(newCert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/certifications/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.json(cert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/certifications/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CLIENTS ENDPOINTS ============
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API is running',
    database: 'MongoDB Atlas'
  });
});

// Start server if not running in Vercel (local development)
if (process.env.NODE_ENV !== 'production') {
  // Connect to MongoDB for local development
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Portfolio API server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`💾 Database: MongoDB Atlas`);
    });
  }).catch((error) => {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  });
}

export default app;
