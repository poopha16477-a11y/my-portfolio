import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import './Contact.css';

const EMAIL = 's6603051624130@email.kmutnb.ac.th';

function Contact() {
    // สไลด์ 07 & 11 - useState สำหรับ controlled form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
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
                        <div className="contact-item chunky animate-fade-in-up delay-2">
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
                        </div>

                        <div className="contact-item chunky animate-fade-in-up delay-3">
                            <div className="contact-item-icon" aria-hidden="true">📱</div>
                            <div className="contact-item-text">
                                <h3>โทรศัพท์</h3>
                                <p>
                                    <a href="tel:+66621945791">062-194-5791</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item chunky animate-fade-in-up delay-4">
                            <div className="contact-item-icon" aria-hidden="true">📍</div>
                            <div className="contact-item-text">
                                <h3>ที่อยู่</h3>
                                <p>28/10 หมู่ 1 ต.บางใหญ่ อ.บางใหญ่ จ.นนทบุรี 11140</p>
                            </div>
                        </div>

                        <div className="contact-item chunky animate-fade-in-up delay-5">
                            <div className="contact-item-icon" aria-hidden="true">🔗</div>
                            <div className="contact-item-text">
                                <h3>Social Media</h3>
                                <p className="social-links">
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        GitHub
                                    </a>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        Facebook
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        Instagram
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form — สไลด์ 11 - Controlled Components */}
                    <div className="contact-form-wrapper chunky animate-fade-in-up delay-3">
                        <span className="form-sticker" aria-hidden="true">Say hi!</span>
                        <h3>ส่งข้อความถึงฉัน ✍️</h3>

                        {isSubmitted ? (
                            <div className="form-success">
                                <div className="success-icon" aria-hidden="true">🎉</div>
                                <p>ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อมา</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name">ชื่อ</label>
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
                                        <label htmlFor="contact-email">อีเมล</label>
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
                                    <label htmlFor="contact-subject">หัวข้อ</label>
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
                                    <label htmlFor="contact-message">ข้อความ</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="พิมพ์ข้อความของคุณ..."
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary form-submit">
                                    ส่งข้อความ <span className="send-icon" aria-hidden="true">✈</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
