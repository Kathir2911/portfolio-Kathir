import React from 'react';
import './Navbar.css';

function Navbar() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="nav-logo">KG</div>
                <ul className="nav-links">
                    <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
                    <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
                    <li><a onClick={() => scrollToSection('experience')}>Experience</a></li>
                    <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
                    <li><a onClick={() => scrollToSection('certifications')}>Certifications</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
