import React from 'react';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <p>&copy; {currentYear} Kathir G. Built with React & Express.</p>
                <div className="footer-links">
                    <a href="https://github.com/Kathir2911" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com/in/kathir-ganesan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="mailto:kathirganesan11@gmail.com">Email</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
