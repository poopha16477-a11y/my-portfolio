import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <p className="footer-text">
                    © {currentYear} <span>Portfolio</span>. All rights reserved.
                </p>
                <div className="footer-links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
