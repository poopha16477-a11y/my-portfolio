import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BouncyText from '../components/BouncyText';
import Reveal from '../components/Reveal';
import { splitGraphemes } from '../utils/graphemes';
import './Home.css';

const ROLES = [
    'นักพัฒนาเว็บสาย React',
    'นักศึกษาวิศวะอิเล็กทรอนิกส์',
    'คนชอบลองเทคโนโลยีใหม่ๆ',
    'สาย Hardware',
];

const GREETINGS = ['สวัสดีครับ!', 'Hello!', 'ยินดีที่ได้รู้จัก', 'กดอีกทีสิ :)'];

// ทักษะแบ่งตามหมวด ใช้ทั้งในการ์ด Skills และแถบเลื่อน แก้ที่นี่ที่เดียว
const SKILL_GROUPS = [
    { label: 'Web', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
    { label: 'Programming', items: ['Python', 'Java', 'C++', 'Dart'] },
    { label: 'Data', items: ['Firebase', 'SQL'] },
    { label: 'Hardware', items: ['Microcontroller'] },
];
const SKILLS = SKILL_GROUPS.flatMap((group) => group.items);

// แถบเลื่อนแถวที่สอง (วิ่งสวนทาง)
const INTERESTS = ['Web Development', 'Electronics', 'Hardware', 'Microcontroller', 'UI ที่เล่นได้', 'Always Learning'];

const STICKERS = [
    { label: 'React', className: 'sticker-1' },
    { label: 'Python', className: 'sticker-2' },
    { label: 'Dart', className: 'sticker-3' },
    { label: 'Firebase', className: 'sticker-4' },
];

function Marquee({ items, className, label, hidden = false }) {
    return (
        <div className={`marquee ${className}`} aria-label={label} aria-hidden={hidden || undefined}>
            <div className="marquee-track">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="marquee-item" aria-hidden={i >= items.length || undefined}>
                        {item} <span className="marquee-star">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

// งานอดิเรก แบ่งตามหมวด
const HOBBIES = [
    {
        category: 'Sports',
        th: 'กีฬา',
        icon: '🏆',
        tone: 'gold',
        items: [
            { emoji: '⚽', label: 'ฟุตบอล' },
            { emoji: '🥅', label: 'ฟุตซอล' },
            { emoji: '🏐', label: 'วอลเลย์บอล' },
            { emoji: '🏸', label: 'แบดมินตัน' },
        ],
    },
    {
        category: 'Music',
        th: 'ดนตรี',
        icon: '🎵',
        tone: 'light',
        items: [
            { emoji: '🎸', label: 'กีตาร์' },
            { emoji: '🥁', label: 'กลอง' },
        ],
    },
    {
        category: 'Outdoor & Giving',
        th: 'กิจกรรม',
        icon: '🌿',
        tone: 'navy',
        items: [
            { emoji: '🌲', label: 'เที่ยวป่า' },
            { emoji: '🥾', label: 'เดินป่า' },
            { emoji: '🎁', label: 'แจกของตามแถบชนบท' },
        ],
    },
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
                            <BouncyText text="Poopha" />{' '}
                            <BouncyText text="Sanankhun" className="highlight" />
                        </h1>
                        <p className="hero-en animate-fade-in-up delay-3">ภูผา สนานคุณ</p>

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

            {/* Skills Marquee — 2 แถบไขว้กัน วิ่งสวนทาง */}
            <div className="marquee-stack">
                <Marquee items={INTERESTS} className="marquee-b" hidden />
                <Marquee items={SKILLS} className="marquee-a" label="ทักษะ" />
            </div>

            {/* About Section */}
            <section className="about-section section">
                <div className="container">
                    <Reveal as="span" className="section-label">เกี่ยวกับฉัน</Reveal>
                    <Reveal as="h2" className="section-title" delay={80}>About Me</Reveal>

                    <div className="about-grid">
                        <Reveal className="about-card card-edu" delay={150}>
                            <div className="about-card-head">
                                <span className="about-card-icon" aria-hidden="true">🎓</span>
                                <h3>Education</h3>
                            </div>
                            <p>
                                กำลังศึกษาอยู่ในระดับปริญญาตรี สาขา เทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์
                                มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                            </p>
                            <ul className="chip-list card-foot">
                                {['ปริญญาตรี', 'อิเล็กทรอนิกส์', 'คอมพิวเตอร์', 'มจพ.'].map((tag, i) => (
                                    <li key={tag} className={`chip ${i === 1 ? 'chip-hot' : ''}`}>{tag}</li>
                                ))}
                            </ul>
                        </Reveal>

                        <Reveal className="about-card card-goal" delay={270}>
                            <div className="about-card-head">
                                <span className="about-card-icon" aria-hidden="true">🎯</span>
                                <h3>Goals</h3>
                            </div>
                            <p>ต้องการพัฒนาทักษะด้านการเขียนโปรแกรมและสร้างผลงานที่มีคุณค่า</p>
                        </Reveal>

                        <Reveal className="about-card card-skill" delay={390}>
                            <div className="about-card-head">
                                <span className="about-card-icon" aria-hidden="true">💻</span>
                                <h3>Skills</h3>
                            </div>
                            <div className="skill-groups">
                                {SKILL_GROUPS.map((group) => (
                                    <div key={group.label} className="skill-group">
                                        <span className="skill-group-label">{group.label}</span>
                                        <ul className="chip-list">
                                            {group.items.map((skill) => (
                                                <li key={skill} className="chip">{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Hobbies Section */}
            <section className="hobbies-section section">
                <div className="hobbies-doodles" aria-hidden="true">
                    <span className="doodle doodle-star">✦</span>
                    <span className="doodle doodle-ring"></span>
                    <span className="doodle doodle-dots"></span>
                </div>

                <div className="container">
                    <Reveal as="span" className="section-label">งานอดิเรก</Reveal>
                    <Reveal as="h2" className="section-title" delay={80}>Hobbies</Reveal>
                    <Reveal as="p" className="hobbies-intro" delay={140}>
                        นอกจากเขียนโค้ดแล้ว เวลาว่างผมชอบทำสิ่งเหล่านี้
                    </Reveal>

                    <div className="hobbies-grid">
                        {HOBBIES.map((group, i) => (
                            <Reveal
                                key={group.category}
                                className={`hobby-card chunky tone-${group.tone}`}
                                delay={200 + i * 130}
                            >
                                <div className="hobby-card-head">
                                    <span className="hobby-card-icon" aria-hidden="true">{group.icon}</span>
                                    <div>
                                        <h3>{group.category}</h3>
                                        <span className="hobby-card-th">{group.th}</span>
                                    </div>
                                    <span className="hobby-count" aria-label={`${group.items.length} อย่าง`}>
                                        {group.items.length}
                                    </span>
                                </div>
                                <ul className="hobby-chips">
                                    {group.items.map((item) => (
                                        <li key={item.label} className="hobby-chip">
                                            <span className="hobby-chip-emoji" aria-hidden="true">{item.emoji}</span>
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
