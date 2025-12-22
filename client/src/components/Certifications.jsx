import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../api/portfolio';
import './Certifications.css';

function Certifications() {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const response = await portfolioAPI.getCertifications();
                setCertifications(response.data);
            } catch (error) {
                console.error('Error fetching certifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertifications();
    }, []);

    if (loading) return <div className="container">Loading certifications...</div>;

    return (
        <section id="certifications">
            <div className="container">
                <h2>Certifications & Courses</h2>
                <div className="certifications-list">
                    {certifications.map((cert) => (
                        <div key={cert.id} className="cert-item">
                            <div className="cert-header">
                                <div>
                                    <h3 className="cert-name">{cert.name}</h3>
                                    <p className="cert-provider">{cert.provider}</p>
                                    {cert.link && (
                                        <a
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cert-link"
                                        >
                                            View Certificate
                                        </a>
                                    )}
                                </div>
                                <span className="cert-date">{cert.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certifications;
