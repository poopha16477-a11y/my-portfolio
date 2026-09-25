import { useState } from 'react';
import './Contact.css';

function Contact() {
    // สไลด์ 07 & 11 - useState สำหรับ controlled form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    return (
        <div className="contact-page">
            <div className="container section">
                <div className="contact-header">
                    <span className="section-label animate-fade-in-up">ติดต่อ</span>
                    <h2 className="section-title animate-fade-in-up delay-1" style={{ textAlign: 'center' }}>
                        Contact
                    </h2>
                    <p className="animate-fade-in-up delay-2">
                        สนใจติดต่อหรือสอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้ผ่านช่องทางด้านล่าง
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <div className="contact-item animate-fade-in-up delay-2">
                            <div className="contact-item-icon">📧</div>
                            <div className="contact-item-text">
                                <h3>Email</h3>
                                <p>
                                    <a href="mailto:example@email.com">example@email.com</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item animate-fade-in-up delay-3">
                            <div className="contact-item-icon">📱</div>
                            <div className="contact-item-text">
                                <h3>โทรศัพท์</h3>
                                <p>
                                    <a href="tel:+66123456789">012-345-6789</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item animate-fade-in-up delay-4">
                            <div className="contact-item-icon">📍</div>
                            <div className="contact-item-text">
                                <h3>ที่อยู่</h3>
                                <p>กรุงเทพมหานคร, ประเทศไทย</p>
                            </div>
                        </div>

                        <div className="contact-item animate-fade-in-up delay-5">
                            <div className="contact-item-icon">🔗</div>
                            <div className="contact-item-text">
                                <h3>Social Media</h3>
                                <p>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        GitHub
                                    </a>
                                    {' • '}
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        Facebook
                                    </a>
                                    {' • '}
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        Instagram
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form — สไลด์ 11 - Controlled Components */}
                    <div className="contact-form-wrapper animate-fade-in-up delay-3">
                        <h3>ส่งข้อความถึงฉัน</h3>

                        {isSubmitted ? (
                            <div className="form-success animate-fade-in">
                                <div className="success-icon">✅</div>
                                <p>ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อมา</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
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

                                <button type="submit" className="form-submit">
                                    ส่งข้อความ
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
