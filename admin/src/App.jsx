import React, { useState, useEffect } from 'react';
import { portfolioAPI } from './api/portfolio';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form states
    const [profileForm, setProfileForm] = useState({
        name: '', title: '', bio: '', email: '', phone: '', linkedin: '', github: '', codolio: '', resume: ''
    });
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', technologies: '', github: '', link: '', date: '', highlights: ''
    });
    const [certForm, setCertForm] = useState({
        name: '', provider: '', date: '', link: ''
    });
    const [expForm, setExpForm] = useState({
        role: '', company: '', duration: '', description: '', technologies: '', highlights: ''
    });
    const [eduForm, setEduForm] = useState({
        institution: '', degree: '', cgpa: '', percentage: '', year: '', current: false
    });
    const [skillsForm, setSkillsForm] = useState({
        programmingLanguages: '', webTechnologies: '', databases: '', frameworksLibraries: '', tools: '', platforms: ''
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'profile') {
                const res = await portfolioAPI.getProfile();
                setProfile(res.data);
                if (res.data) {
                    setProfileForm({
                        name: res.data.name || '',
                        title: res.data.title || '',
                        bio: res.data.bio || '',
                        email: res.data.email || '',
                        phone: res.data.phone || '',
                        linkedin: res.data.linkedin || '',
                        github: res.data.github || '',
                        codolio: res.data.codolio || '',
                        resume: res.data.resume || ''
                    });
                }
            } else if (activeTab === 'projects') {
                const res = await portfolioAPI.getProjects();
                setProjects(res.data);
            } else if (activeTab === 'certifications') {
                const res = await portfolioAPI.getCertifications();
                setCertifications(res.data);
            } else if (activeTab === 'experience') {
                const res = await portfolioAPI.getExperience();
                setExperience(res.data);
            } else if (activeTab === 'education') {
                const res = await portfolioAPI.getEducation();
                setEducation(res.data);
            } else if (activeTab === 'skills') {
                const res = await portfolioAPI.getSkills();
                setSkills(res.data);
                if (res.data) {
                    setSkillsForm({
                        programmingLanguages: (res.data.programmingLanguages || []).join(', '),
                        webTechnologies: (res.data.webTechnologies || []).join(', '),
                        databases: (res.data.databases || []).join(', '),
                        frameworksLibraries: (res.data.frameworksLibraries || []).join(', '),
                        tools: (res.data.tools || []).join(', '),
                        platforms: (res.data.platforms || []).join(', ')
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    // Profile handler
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await portfolioAPI.updateProfile(profileForm);
            alert('Profile updated!');
            fetchData();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    // Project handlers
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                ...projectForm,
                technologies: projectForm.technologies.split(',').map(t => t.trim()),
                highlights: projectForm.highlights.split('\n').filter(h => h.trim())
            };

            if (editingId) {
                await portfolioAPI.updateProject(editingId, data);
            } else {
                await portfolioAPI.addProject(data);
            }

            resetProjectForm();
            fetchData();
            alert(editingId ? 'Project updated!' : 'Project added!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving project');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!confirm('Delete this project?')) return;
        setLoading(true);
        try {
            await portfolioAPI.deleteProject(id);
            fetchData();
            alert('Project deleted!');
        } catch (error) {
            alert('Error deleting project');
        } finally {
            setLoading(false);
        }
    };

    const editProject = (project) => {
        setProjectForm({
            title: project.title,
            description: project.description,
            technologies: project.technologies.join(', '),
            github: project.github || '',
            link: project.link || '',
            date: project.date,
            highlights: project.highlights.join('\n')
        });
        setEditingId(project._id);
    };

    const resetProjectForm = () => {
        setProjectForm({ title: '', description: '', technologies: '', github: '', link: '', date: '', highlights: '' });
        setEditingId(null);
    };

    // Certification handlers
    const handleCertSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await portfolioAPI.updateCertification(editingId, certForm);
            } else {
                await portfolioAPI.addCertification(certForm);
            }
            resetCertForm();
            fetchData();
            alert(editingId ? 'Certification updated!' : 'Certification added!');
        } catch (error) {
            alert('Error saving certification');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCert = async (id) => {
        if (!confirm('Delete this certification?')) return;
        setLoading(true);
        try {
            await portfolioAPI.deleteCertification(id);
            fetchData();
            alert('Certification deleted!');
        } catch (error) {
            alert('Error deleting certification');
        } finally {
            setLoading(false);
        }
    };

    const editCert = (cert) => {
        setCertForm({
            name: cert.name,
            provider: cert.provider,
            date: cert.date,
            link: cert.link || ''
        });
        setEditingId(cert._id);
    };

    const resetCertForm = () => {
        setCertForm({ name: '', provider: '', date: '', link: '' });
        setEditingId(null);
    };

    // Experience handlers
    const handleExpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                ...expForm,
                technologies: expForm.technologies.split(',').map(t => t.trim()),
                highlights: expForm.highlights.split('\n').filter(h => h.trim())
            };

            if (editingId) {
                await portfolioAPI.updateExperience(editingId, data);
            } else {
                await portfolioAPI.addExperience(data);
            }

            resetExpForm();
            fetchData();
            alert(editingId ? 'Experience updated!' : 'Experience added!');
        } catch (error) {
            alert('Error saving experience');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExp = async (id) => {
        if (!confirm('Delete this experience?')) return;
        setLoading(true);
        try {
            await portfolioAPI.deleteExperience(id);
            fetchData();
            alert('Experience deleted!');
        } catch (error) {
            alert('Error deleting experience');
        } finally {
            setLoading(false);
        }
    };

    const editExp = (exp) => {
        setExpForm({
            role: exp.role,
            company: exp.company,
            duration: exp.duration,
            description: exp.description,
            technologies: exp.technologies.join(', '),
            highlights: exp.highlights.join('\n')
        });
        setEditingId(exp._id);
    };

    const resetExpForm = () => {
        setExpForm({ role: '', company: '', duration: '', description: '', technologies: '', highlights: '' });
        setEditingId(null);
    };

    // Education handlers
    const handleEduSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await portfolioAPI.updateEducation(editingId, eduForm);
            } else {
                await portfolioAPI.addEducation(eduForm);
            }
            resetEduForm();
            fetchData();
            alert(editingId ? 'Education updated!' : 'Education added!');
        } catch (error) {
            alert('Error saving education');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEdu = async (id) => {
        if (!confirm('Delete this education?')) return;
        setLoading(true);
        try {
            await portfolioAPI.deleteEducation(id);
            fetchData();
            alert('Education deleted!');
        } catch (error) {
            alert('Error deleting education');
        } finally {
            setLoading(false);
        }
    };

    const editEdu = (edu) => {
        setEduForm({
            institution: edu.institution,
            degree: edu.degree,
            cgpa: edu.cgpa || '',
            percentage: edu.percentage || '',
            year: edu.year,
            current: edu.current || false
        });
        setEditingId(edu._id);
    };

    const resetEduForm = () => {
        setEduForm({ institution: '', degree: '', cgpa: '', percentage: '', year: '', current: false });
        setEditingId(null);
    };

    // Skills handlers
    const handleSkillsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                programmingLanguages: skillsForm.programmingLanguages ? skillsForm.programmingLanguages.split(',').map(s => s.trim()).filter(Boolean) : [],
                webTechnologies: skillsForm.webTechnologies ? skillsForm.webTechnologies.split(',').map(s => s.trim()).filter(Boolean) : [],
                databases: skillsForm.databases ? skillsForm.databases.split(',').map(s => s.trim()).filter(Boolean) : [],
                frameworksLibraries: skillsForm.frameworksLibraries ? skillsForm.frameworksLibraries.split(',').map(s => s.trim()).filter(Boolean) : [],
                tools: skillsForm.tools ? skillsForm.tools.split(',').map(s => s.trim()).filter(Boolean) : [],
                platforms: skillsForm.platforms ? skillsForm.platforms.split(',').map(s => s.trim()).filter(Boolean) : []
            };
            await portfolioAPI.updateSkills(data);
            alert('Skills updated!');
            fetchData();
        } catch (error) {
            console.error('Error updating skills:', error);
            alert('Error updating skills');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Portfolio Admin Panel</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Manage your portfolio content</p>
            </div>

            <div className="admin-tabs">
                <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                    Profile
                </button>
                <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
                    Projects
                </button>
                <button className={activeTab === 'certifications' ? 'active' : ''} onClick={() => setActiveTab('certifications')}>
                    Certifications
                </button>
                <button className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>
                    Experience
                </button>
                <button className={activeTab === 'education' ? 'active' : ''} onClick={() => setActiveTab('education')}>
                    Education
                </button>
                <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>
                    Skills
                </button>
            </div>

            <div className="admin-content">
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                    <div className="admin-section">
                        <h2>Personal Details</h2>
                        <form onSubmit={handleProfileSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={profileForm.title}
                                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Bio"
                                value={profileForm.bio}
                                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                                rows="4"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="LinkedIn Username"
                                value={profileForm.linkedin}
                                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="GitHub Username"
                                value={profileForm.github}
                                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Codolio Card URL"
                                value={profileForm.codolio}
                                onChange={(e) => setProfileForm({ ...profileForm, codolio: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Resume URL (Link to PDF/Drive)"
                                value={profileForm.resume}
                                onChange={(e) => setProfileForm({ ...profileForm, resume: e.target.value })}
                            />
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div className="admin-section">
                        <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                        <form onSubmit={handleProjectSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={projectForm.title}
                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={projectForm.description}
                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                rows="4"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Technologies (comma separated: React, Node.js, MongoDB)"
                                value={projectForm.technologies}
                                onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Source Code URL (GitHub)"
                                value={projectForm.github}
                                onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Live Demo URL"
                                value={projectForm.link}
                                onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Date (e.g., January 2026)"
                                value={projectForm.date}
                                onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                            />
                            <textarea
                                placeholder="Highlights (one per line)"
                                value={projectForm.highlights}
                                onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                                rows="3"
                            />
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Add Project')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetProjectForm} className="cancel-btn">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <h2>Existing Projects</h2>
                        <div className="items-list">
                            {projects.map(project => (
                                <div key={project._id} className="item-card">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="item-actions">
                                        <button onClick={() => editProject(project)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDeleteProject(project._id)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CERTIFICATIONS TAB */}
                {activeTab === 'certifications' && (
                    <div className="admin-section">
                        <h2>{editingId ? 'Edit Certification' : 'Add New Certification'}</h2>
                        <form onSubmit={handleCertSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Certification Name"
                                value={certForm.name}
                                onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Provider (e.g., Coursera, NPTEL)"
                                value={certForm.provider}
                                onChange={(e) => setCertForm({ ...certForm, provider: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Date (e.g., March 2025)"
                                value={certForm.date}
                                onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Certificate Link (optional)"
                                value={certForm.link}
                                onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                            />
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : (editingId ? 'Update Certification' : 'Add Certification')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetCertForm} className="cancel-btn">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <h2>Existing Certifications</h2>
                        <div className="items-list">
                            {certifications.map(cert => (
                                <div key={cert._id} className="item-card">
                                    <h3>{cert.name}</h3>
                                    <p>{cert.provider} - {cert.date}</p>
                                    <div className="item-actions">
                                        <button onClick={() => editCert(cert)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDeleteCert(cert._id)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EXPERIENCE TAB */}
                {activeTab === 'experience' && (
                    <div className="admin-section">
                        <h2>{editingId ? 'Edit Experience' : 'Add New Experience'}</h2>
                        <form onSubmit={handleExpSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Role/Position"
                                value={expForm.role}
                                onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={expForm.company}
                                onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Duration (e.g., June 2025 - July 2025)"
                                value={expForm.duration}
                                onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={expForm.description}
                                onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                                rows="4"
                            />
                            <input
                                type="text"
                                placeholder="Technologies (comma separated)"
                                value={expForm.technologies}
                                onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                            />
                            <textarea
                                placeholder="Highlights (one per line)"
                                value={expForm.highlights}
                                onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })}
                                rows="3"
                            />
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : (editingId ? 'Update Experience' : 'Add Experience')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetExpForm} className="cancel-btn">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <h2>Existing Experience</h2>
                        <div className="items-list">
                            {experience.map(exp => (
                                <div key={exp._id} className="item-card">
                                    <h3>{exp.role}</h3>
                                    <p>{exp.company} - {exp.duration}</p>
                                    <div className="item-actions">
                                        <button onClick={() => editExp(exp)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDeleteExp(exp._id)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EDUCATION TAB */}
                {activeTab === 'education' && (
                    <div className="admin-section">
                        <h2>{editingId ? 'Edit Education' : 'Add New Education'}</h2>
                        <form onSubmit={handleEduSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Institution Name"
                                value={eduForm.institution}
                                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Degree/Program"
                                value={eduForm.degree}
                                onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="CGPA (optional)"
                                value={eduForm.cgpa}
                                onChange={(e) => setEduForm({ ...eduForm, cgpa: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Percentage (optional)"
                                value={eduForm.percentage}
                                onChange={(e) => setEduForm({ ...eduForm, percentage: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Year (e.g., 2027)"
                                value={eduForm.year}
                                onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                                required
                            />
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={eduForm.current}
                                    onChange={(e) => setEduForm({ ...eduForm, current: e.target.checked })}
                                />
                                Currently studying here
                            </label>
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : (editingId ? 'Update Education' : 'Add Education')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetEduForm} className="cancel-btn">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <h2>Existing Education</h2>
                        <div className="items-list">
                            {education.map(edu => (
                                <div key={edu._id} className="item-card">
                                    <h3>{edu.institution}</h3>
                                    <p>{edu.degree} - {edu.year}</p>
                                    {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                                    <div className="item-actions">
                                        <button onClick={() => editEdu(edu)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDeleteEdu(edu._id)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EDUCATION TAB */}
                {activeTab === 'education' && (
                    <div className="admin-section">
                        <h2>{editingId ? 'Edit Education' : 'Add New Education'}</h2>
                        <form onSubmit={handleEduSubmit} className="admin-form">
                            <input
                                type="text"
                                placeholder="Institution Name"
                                value={eduForm.institution}
                                onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Degree/Program"
                                value={eduForm.degree}
                                onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="CGPA (optional)"
                                value={eduForm.cgpa}
                                onChange={(e) => setEduForm({ ...eduForm, cgpa: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Percentage (optional)"
                                value={eduForm.percentage}
                                onChange={(e) => setEduForm({ ...eduForm, percentage: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Year (e.g., 2027)"
                                value={eduForm.year}
                                onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                                required
                            />
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={eduForm.current}
                                    onChange={(e) => setEduForm({ ...eduForm, current: e.target.checked })}
                                />
                                Currently studying here
                            </label>
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : (editingId ? 'Update Education' : 'Add Education')}
                                </button>
                                {editingId && (
                                    <button type="button" onClick={resetEduForm} className="cancel-btn">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <h2>Existing Education</h2>
                        <div className="items-list">
                            {education.map(edu => (
                                <div key={edu._id} className="item-card">
                                    <h3>{edu.institution}</h3>
                                    <p>{edu.degree} - {edu.year}</p>
                                    {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
                                    <div className="item-actions">
                                        <button onClick={() => editEdu(edu)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDeleteEdu(edu._id)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SKILLS TAB */}
                {activeTab === 'skills' && (
                    <div className="admin-section">
                        <h2>Technical Skills</h2>
                        <form onSubmit={handleSkillsSubmit} className="admin-form">
                            <label>Programming Languages (comma separated)</label>
                            <input
                                type="text"
                                placeholder="e.g., Python, JavaScript, Java"
                                value={skillsForm.programmingLanguages}
                                onChange={(e) => setSkillsForm({ ...skillsForm, programmingLanguages: e.target.value })}
                            />
                            <label>Web Technologies</label>
                            <input
                                type="text"
                                placeholder="e.g., HTML, CSS"
                                value={skillsForm.webTechnologies}
                                onChange={(e) => setSkillsForm({ ...skillsForm, webTechnologies: e.target.value })}
                            />
                            <label>Databases</label>
                            <input
                                type="text"
                                placeholder="e.g., MySQL, MongoDB"
                                value={skillsForm.databases}
                                onChange={(e) => setSkillsForm({ ...skillsForm, databases: e.target.value })}
                            />
                            <label>Frameworks/Libraries</label>
                            <input
                                type="text"
                                placeholder="e.g., React.js, Express.js"
                                value={skillsForm.frameworksLibraries}
                                onChange={(e) => setSkillsForm({ ...skillsForm, frameworksLibraries: e.target.value })}
                            />
                            <label>Tools</label>
                            <input
                                type="text"
                                placeholder="e.g., Git, Postman"
                                value={skillsForm.tools}
                                onChange={(e) => setSkillsForm({ ...skillsForm, tools: e.target.value })}
                            />
                            <label>Platforms</label>
                            <input
                                type="text"
                                placeholder="e.g., GitHub, VS Code"
                                value={skillsForm.platforms}
                                onChange={(e) => setSkillsForm({ ...skillsForm, platforms: e.target.value })}
                            />
                            <div className="form-actions">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Skills'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
