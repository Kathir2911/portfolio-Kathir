import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../api/portfolio';
import './Education.css';

function Education() {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await portfolioAPI.getEducation();
                setEducation(response.data);
            } catch (error) {
                console.error('Error fetching education:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    if (loading) return <div className="container">Loading education...</div>;

    return (
        <section id="education">
            <div className="container">
                <h2>Education</h2>
                <div className="education-timeline">
                    {education.map((edu) => (
                        <div key={edu.id} className="education-item">
                            <div className="education-header">
                                <div>
                                    <h3 className="education-school">{edu.institution}</h3>
                                    <p className="education-degree">{edu.degree}</p>
                                    {edu.cgpa && <p className="education-grade">CGPA: {edu.cgpa}</p>}
                                    {edu.percentage && <p className="education-grade">{edu.percentage}</p>}
                                </div>
                                <span className="education-year">{edu.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Education;
