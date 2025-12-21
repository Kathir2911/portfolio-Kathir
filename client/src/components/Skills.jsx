import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../api/portfolio';
import './Skills.css';

function Skills() {
    const [skills, setSkills] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await portfolioAPI.getSkills();
                setSkills(response.data);
            } catch (error) {
                console.error('Error fetching skills:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return <div className="container">Loading skills...</div>;
    if (!skills) return null;

    return (
        <section id="skills">
            <div className="container">
                <h2>Technical Skills</h2>
                <div className="skills-container">
                    {skills.languages && (
                        <div className="skills-category">
                            <h3>Languages</h3>
                            <div className="skills-list">
                                {skills.languages.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.frameworks && (
                        <div className="skills-category">
                            <h3>Frameworks & Libraries</h3>
                            <div className="skills-list">
                                {skills.frameworks.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.tools && (
                        <div className="skills-category">
                            <h3>Tools</h3>
                            <div className="skills-list">
                                {skills.tools.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.platforms && (
                        <div className="skills-category">
                            <h3>Platforms</h3>
                            <div className="skills-list">
                                {skills.platforms.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Skills;
