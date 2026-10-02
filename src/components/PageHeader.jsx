import BouncyText from './BouncyText';
import './PageHeader.css';

// หัวข้อของแต่ละหน้า ใช้ร่วมกันทุกหน้า
function PageHeader({ icon: Icon, label, title, children }) {
    return (
        <header className="page-header">
            <div className="page-doodles" aria-hidden="true">
                <span className="doodle doodle-circle"></span>
                <span className="doodle doodle-star">✦</span>
                <span className="doodle doodle-star small">✦</span>
                <svg className="doodle doodle-squiggle" viewBox="0 0 120 30" fill="none">
                    <path d="M2 15 Q 17 0, 32 15 T 62 15 T 92 15 T 118 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <span className="doodle doodle-dots"></span>
            </div>

            <span className="pill-label animate-fade-in-up">
                <span className="pill-emoji" aria-hidden="true"><Icon /></span> {label}
            </span>
            <h1 className="page-title animate-fade-in-up delay-1">
                <BouncyText text={title} />
            </h1>
            {children && <p className="page-subtitle animate-fade-in-up delay-2">{children}</p>}
        </header>
    );
}

export default PageHeader;
