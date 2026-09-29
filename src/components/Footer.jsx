import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <p className="footer-text">
                    © {currentYear} <span>Portfolio</span>. Made with <span className="heart" aria-label="love">♥</span> &amp; React
                </p>
                <div className="footer-links">
                    <a href="https://github.com/poopha16477-a11y" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <button type="button" className="footer-top" onClick={scrollToTop}>
                        ขึ้นด้านบน ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
