import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../api/portfolio';
import './Clients.css';

function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await portfolioAPI.getClients();
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading || clients.length === 0) return null;

    return (
        <section className="clients-section container" id="clients">
            <h2>Trusted By</h2>
            <div className="clients-grid">
                {clients.map((client) => (
                    <a
                        key={client._id}
                        href={client.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="client-card"
                        aria-label={client.name}
                    >
                        <img
                            src={client.logo}
                            alt={`${client.name} logo`}
                            className="client-logo"
                            loading="lazy"
                        />
                    </a>
                ))}
            </div>
        </section>
    );
}

export default Clients;
