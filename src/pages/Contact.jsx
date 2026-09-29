import { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import './Contact.css';

const EMAIL = 'Poopha16477@gmail.com';
const GITHUB_URL = 'https://github.com/poopha16477-a11y';

// ค่าจาก EmailJS (ดู .env.example) ถ้ายังไม่ได้ตั้งค่า ฟอร์มจะเปิดแอปอีเมลพร้อมข้อความที่กรอกไว้แทน
const EMAILJS = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const EMAILJS_READY = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);
// ตำแหน่งพลุกระดาษตอนส่งสำเร็จ (คำนวณครั้งเดียว ไม่สุ่มตอน render)
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
    x: `${Math.round(Math.cos((i / 18) * Math.PI * 2) * (90 + (i % 3) * 40))}px`,
    y: `${Math.round(Math.sin((i / 18) * Math.PI * 2) * (70 + (i % 4) * 25) - 40)}px`,
    r: `${(i * 67) % 360}deg`,
    color: ['var(--gold)', 'var(--accent)', '#F2C14E', 'var(--text-muted)'][i % 4],
}));

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function Contact() {
    // สไลด์ 07 & 11 - useState สำหรับ controlled form
    const [formData, setFormData] = useState(EMPTY_FORM);
    // idle | sending | sent | mailto | error
    const [status, setStatus] = useState('idle');
    const [copied, setCopied] = useState(false);

    // สไลด์ 06 - Event Handling
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // สไลด์ 06 & 11 - Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!EMAILJS_READY) {
            const body = `${formData.message}

— ${formData.name} (${formData.email})`;
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
            setStatus('mailto');
            return;
        }

        setStatus('sending');
        try {
            // ชื่อตัวแปรเหล่านี้ต้องตรงกับที่ใช้ใน EmailJS template: {{name}} {{email}} {{subject}} {{message}}
            await emailjs.send(
                EMAILJS.serviceId,
                EMAILJS.templateId,
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                { publicKey: EMAILJS.publicKey },
            );
            setStatus('sent');
            setFormData(EMPTY_FORM);
        } catch (err) {
            console.error('EmailJS error:', err);
            setStatus('error');
        }
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <div className="contact-page">
            <div className="container section">
                <PageHeader emoji="💌" label="ติดต่อ" title="Contact">
                    สนใจติดต่อหรือสอบถามข้อมูลเพิ่มเติม<br />
                    สามารถติดต่อได้ผ่านช่องทางด้านล่าง
                </PageHeader>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <Reveal className="contact-item chunky" delay={0}>
                            <div className="contact-item-icon" aria-hidden="true">📧</div>
                            <div className="contact-item-text">
                                <h3>Email</h3>
                                <p>
                                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                                </p>
                            </div>
                            <button type="button" className="copy-btn" onClick={handleCopyEmail}>
                                {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
                            </button>
                        </Reveal>

                        <Reveal className="contact-item chunky" delay={100}>
                            <div className="contact-item-icon" aria-hidden="true">📱</div>
                            <div className="contact-item-text">
                                <h3>Phone</h3>
                                <p>
                                    <a href="tel:+66621945791">062-194-5791</a>
                                </p>
                            </div>
                        </Reveal>

                        <Reveal className="contact-item chunky" delay={200}>
                            <div className="contact-item-icon" aria-hidden="true">📍</div>
                            <div className="contact-item-text">
                                <h3>Location</h3>
                                <p>อ.บางใหญ่ จ.นนทบุรี</p>
                            </div>
                        </Reveal>

                        <Reveal className="contact-item chunky" delay={300}>
                            <div className="contact-item-icon" aria-hidden="true">🔗</div>
                            <div className="contact-item-text">
                                <h3>GitHub</h3>
                                <p className="social-links">
                                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                                        github.com/poopha16477-a11y
                                    </a>
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Contact Form — สไลด์ 11 - Controlled Components */}
                    <Reveal className="contact-form-wrapper chunky" delay={150}>
                        <span className="form-sticker" aria-hidden="true">Say hi!</span>
                        <h3>Send me a message ✍️</h3>

                        {status === 'sent' || status === 'mailto' ? (
                            <div className="form-success" role="status">
                                {status === 'sent' && (
                                    <div className="confetti" aria-hidden="true">
                                        {CONFETTI.map((c, i) => (
                                            <span
                                                key={i}
                                                style={{ '--x': c.x, '--y': c.y, '--r': c.r, background: c.color }}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="success-icon" aria-hidden="true">{status === 'sent' ? '🎉' : '📨'}</div>
                                <p>
                                    {status === 'sent'
                                        ? 'ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อมา'
                                        : 'เปิดแอปอีเมลพร้อมข้อความให้แล้ว กดส่งในแอปอีเมลได้เลย'}
                                </p>
                                <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
                                    เขียนข้อความใหม่
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="กรอกชื่อของคุณ"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contact-email">Email</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-subject">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="หัวข้อที่ต้องการติดต่อ"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-message">Message</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="พิมพ์ข้อความของคุณ..."
                                        required
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="form-error" role="alert">
                                        ส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรืออีเมลมาที่ {EMAIL}
                                    </p>
                                )}

                                <button type="submit" className="btn btn-primary form-submit" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'กำลังส่ง...' : 'ส่งข้อความ'}{' '}
                                    <span className="send-icon" aria-hidden="true">✈</span>
                                </button>
                            </form>
                        )}
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

export default Contact;
