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
                    {skills.programmingLanguages && skills.programmingLanguages.length > 0 && (
                        <div className="skills-category">
                            <h3>Programming Languages</h3>
                            <div className="skills-list">
                                {skills.programmingLanguages.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.webTechnologies && skills.webTechnologies.length > 0 && (
                        <div className="skills-category">
                            <h3>Web Technologies</h3>
                            <div className="skills-list">
                                {skills.webTechnologies.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.databases && skills.databases.length > 0 && (
                        <div className="skills-category">
                            <h3>Databases</h3>
                            <div className="skills-list">
                                {skills.databases.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.frameworksLibraries && skills.frameworksLibraries.length > 0 && (
                        <div className="skills-category">
                            <h3>Frameworks & Libraries</h3>
                            <div className="skills-list">
                                {skills.frameworksLibraries.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.tools && skills.tools.length > 0 && (
                        <div className="skills-category">
                            <h3>Tools</h3>
                            <div className="skills-list">
                                {skills.tools.map((skill, index) => (
                                    <span key={index} className="skill-item">{skill}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.platforms && skills.platforms.length > 0 && (
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
