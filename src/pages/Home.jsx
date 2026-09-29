import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BouncyText from '../components/BouncyText';
import { splitGraphemes } from '../utils/graphemes';
import './Home.css';

const ROLES = [
    'นักพัฒนาเว็บสาย React',
    'นักศึกษาวิศวะอิเล็กทรอนิกส์',
    'คนชอบลองเทคโนโลยีใหม่ๆ',
    'สายบั๊กแล้วแก้เอง',
];

const GREETINGS = ['สวัสดีครับ!', 'Hello!', 'ยินดีที่ได้รู้จัก', 'กดอีกทีสิ :)'];

const SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Java', 'C++', 'Dart', 'Firebase'];

const STICKERS = [
    { label: 'React', className: 'sticker-1' },
    { label: 'Python', className: 'sticker-2' },
    { label: 'Dart', className: 'sticker-3' },
    { label: 'Firebase', className: 'sticker-4' },
];

// ข้อความพิมพ์เอง-ลบเอง วนตาม ROLES
function useTypewriter(words) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[wordIndex];
        let delay = deleting ? 40 : 90;
        if (!deleting && text === word) delay = 1600;

        const timer = setTimeout(() => {
            if (!deleting && text === word) {
                setDeleting(true);
            } else if (deleting && text === '') {
                setDeleting(false);
                setWordIndex((wordIndex + 1) % words.length);
            } else {
                const chars = splitGraphemes(word);
                const current = splitGraphemes(text).length;
                setText(chars.slice(0, deleting ? current - 1 : current + 1).join(''));
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [text, deleting, wordIndex, words]);

    return text;
}

function Home() {
    const tiltRef = useRef(null);
    const role = useTypewriter(ROLES);
    const [greetIndex, setGreetIndex] = useState(0);
    const [popKey, setPopKey] = useState(0);
    const [wiggling, setWiggling] = useState(null);

    // เอียงรูปตามเมาส์ ด้วย CSS variables (ไม่ใช้ state เพื่อไม่ให้ re-render ทุกครั้งที่เมาส์ขยับ)
    const handlePointerMove = (e) => {
        const el = tiltRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
    };

    const handlePointerLeave = () => {
        tiltRef.current?.style.setProperty('--rx', '0deg');
        tiltRef.current?.style.setProperty('--ry', '0deg');
    };

    const handlePhotoClick = () => {
        setGreetIndex((greetIndex + 1) % GREETINGS.length);
        setPopKey(popKey + 1);
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="home-hero">
                <div className="hero-doodles" aria-hidden="true">
                    <span className="doodle doodle-circle"></span>
                    <span className="doodle doodle-ring"></span>
                    <span className="doodle doodle-star">✦</span>
                    <span className="doodle doodle-star small">✦</span>
                    <svg className="doodle doodle-squiggle" viewBox="0 0 120 30" fill="none">
                        <path d="M2 15 Q 17 0, 32 15 T 62 15 T 92 15 T 118 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <span className="doodle doodle-dots"></span>
                </div>

                <div className="container hero-content">
                    <div className="hero-text">
                        <p className="pill-label animate-fade-in-up delay-1">
                            <span className="pill-emoji" aria-hidden="true">👋</span> Welcome to my Portfolio
                        </p>
                        <h1 className="hero-name animate-fade-in-up delay-2">
                            <BouncyText text="ภูผา" />{' '}
                            <BouncyText text="สนานคุณ" className="highlight" />
                        </h1>
                        <p className="hero-en animate-fade-in-up delay-3">Poopha Sanankhun</p>

                        <p className="hero-typer animate-fade-in-up delay-3" aria-live="polite">
                            <span className="typer-prefix">ผมคือ</span>
                            <span className="typer-text">{role}</span>
                            <span className="typer-caret" aria-hidden="true"></span>
                        </p>

                        <p className="hero-role animate-fade-in-up delay-4">
                            นักศึกษา / วิทยาลัยเทคโนโลยีอุตสาหกรรม / มจพ.
                        </p>
                        <p className="hero-description animate-fade-in-up delay-4">
                            นักศึกษาที่มีความสนใจในด้านการพัฒนาเว็บแอปพลิเคชัน
                            ชอบเรียนรู้เทคโนโลยีใหม่ๆ และสร้างสรรค์สิ่งที่มีประโยชน์
                        </p>
                        <div className="hero-buttons animate-fade-in-up delay-5">
                            <Link to="/contact" className="btn btn-primary">
                                ติดต่อฉัน <span className="btn-arrow" aria-hidden="true">→</span>
                            </Link>
                            <Link to="/activities" className="btn btn-outline">
                                ดูผลงาน
                            </Link>
                        </div>
                    </div>

                    <div className="hero-image-wrapper animate-fade-in delay-3">
                        <div
                            className="hero-tilt"
                            ref={tiltRef}
                            onPointerMove={handlePointerMove}
                            onPointerLeave={handlePointerLeave}
                        >
                            <div className="hero-blob-bg" aria-hidden="true"></div>
                            <button
                                type="button"
                                className="hero-photo-btn"
                                onClick={handlePhotoClick}
                                aria-label="ทักทาย"
                            >
                                <img src="/pofile.jpg" alt="Profile" className="hero-image" />
                            </button>

                            <span key={popKey} className="speech-bubble" aria-live="polite">
                                {GREETINGS[greetIndex]}
                            </span>

                            {STICKERS.map((s) => (
                                <span key={s.label} className={`sticker ${s.className}`} aria-hidden="true">
                                    {s.label}
                                </span>
                            ))}
                        </div>
                        <p className="hero-hint" aria-hidden="true">↑ ลองกดที่รูปดูสิ</p>
                    </div>
                </div>
            </section>

            {/* Skills Marquee */}
            <div className="marquee" aria-label="ทักษะ">
                <div className="marquee-track">
                    {[...SKILLS, ...SKILLS].map((skill, i) => (
                        <span key={i} className="marquee-item" aria-hidden={i >= SKILLS.length}>
                            {skill} <span className="marquee-star">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* About Section */}
            <section className="about-section section">
                <div className="container">
                    <span className="section-label">เกี่ยวกับฉัน</span>
                    <h2 className="section-title">About Me</h2>

                    <div className="about-grid">
                        {[
                            {
                                icon: '🎓',
                                title: 'การศึกษา',
                                body: 'กำลังศึกษาอยู่ในระดับปริญญาตรี สาขา เทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
                                className: 'card-edu',
                                tags: ['ปริญญาตรี', 'อิเล็กทรอนิกส์', 'มจพ.'],
                            },
                            {
                                icon: '💻',
                                title: 'ทักษะ',
                                body: 'มีความรู้ด้าน HTML, CSS, JavaScript, React, Python, Java, C++, Dart, Firebase',
                                className: 'card-skill',
                            },
                            {
                                icon: '🎯',
                                title: 'เป้าหมาย',
                                body: 'ต้องการพัฒนาทักษะด้านการเขียนโปรแกรมและสร้างผลงานที่มีคุณค่า',
                                className: 'card-goal',
                            },
                        ].map((card) => (
                            <button
                                type="button"
                                key={card.title}
                                className={`about-card ${card.className} ${wiggling === card.title ? 'wiggle' : ''}`}
                                onClick={() => setWiggling(card.title)}
                                onAnimationEnd={(e) => e.animationName === 'wiggle' && setWiggling(null)}
                            >
                                <span className="about-card-icon" aria-hidden="true">{card.icon}</span>
                                <h3>{card.title}</h3>
                                <p>{card.body}</p>
                                {card.tags && (
                                    <span className="card-tags">
                                        {card.tags.map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
