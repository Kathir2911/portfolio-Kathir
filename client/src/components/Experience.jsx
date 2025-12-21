import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../api/portfolio';
import './Experience.css';

function Experience() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await portfolioAPI.getExperience();
                setExperience(response.data);
            } catch (error) {
                console.error('Error fetching experience:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    if (loading) return <div className="container">Loading experience...</div>;

    return (
        <section id="experience">
            <div className="container">
                <h2>Experience</h2>
                <div className="experience-grid">
                    {experience.map((exp) => (
                        <div key={exp.id} className="experience-card">
                            <div className="card-header">
                                <div>
                                    <h3>{exp.role}</h3>
                                    <p className="company">{exp.company}</p>
                                </div>
                                <span className="duration">{exp.duration}</span>
                            </div>
                            <p className="description">{exp.description}</p>
                            {exp.technologies && (
                                <div className="tech-stack">
                                    {exp.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            )}
                            {exp.highlights && (
                                <ul className="highlights">
                                    {exp.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
