import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    const heroRef = useRef(null);

    // สไลด์ 08 - useEffect สำหรับ animation on mount
    useEffect(() => {
        const elements = heroRef.current?.querySelectorAll('.animate-fade-in-up');
        elements?.forEach((el) => {
            el.style.animationPlayState = 'running';
        });
    }, []);

    return (
        <div ref={heroRef}>
            {/* Hero Section */}
            <section className="home-hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <p className="hero-greeting animate-fade-in-up delay-1">Welcome to my Portfolio</p>
                        <h1 className="hero-name animate-fade-in-up delay-2">
                            ภูผา <span className="highlight">สนานคุณ</span>
                        </h1>
                        <p className="hero-description animate-fade-in-up delay-4">
                            Poopha Sanankhun
                        </p>
                        <p className="hero-role animate-fade-in-up delay-3">
                            นักศึกษา / วิทยาลัยเทคโนโลยีอุตสาหกรรม  / มจพ.
                        </p>
                        <p className="hero-description animate-fade-in-up delay-4">
                            นักศึกษาที่มีความสนใจในด้านการพัฒนาเว็บแอปพลิเคชัน
                            ชอบเรียนรู้เทคโนโลยีใหม่ๆ และสร้างสรรค์สิ่งที่มีประโยชน์
                        </p>
                        <div className="hero-buttons animate-fade-in-up delay-5">
                            <Link to="/contact" className="btn btn-primary">
                                ติดต่อฉัน
                            </Link>
                            <Link to="/activities" className="btn btn-outline">
                                ดูผลงาน
                            </Link>
                        </div>
                    </div>

                    <div className="hero-image-wrapper animate-fade-in delay-3">
                        <div className="hero-image-container">
                            <div className="hero-image-bg"></div>
                            <img src="/pofile.jpg" alt="Profile" className="hero-image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section section">
                <div className="container">
                    <span className="section-label animate-fade-in-up">เกี่ยวกับฉัน</span>
                    <h2 className="section-title animate-fade-in-up delay-1">About Me</h2>

                    <div className="about-grid">
                        <div className="about-card animate-fade-in-up delay-2">
                            <div className="about-card-icon">🎓</div>
                            <h3>การศึกษา</h3>
                            <p>กำลังศึกษาอยู่ในระดับปริญญาตรี สาขา เทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์</p>
                        </div>

                        <div className="about-card animate-fade-in-up delay-3">
                            <div className="about-card-icon">💻</div>
                            <h3>ทักษะ</h3>
                            <p>มีความรู้ด้าน HTML, CSS, JavaScript, React และเครื่องมือพัฒนาเว็บต่างๆ</p>
                        </div>

                        <div className="about-card animate-fade-in-up delay-4">
                            <div className="about-card-icon">🎯</div>
                            <h3>เป้าหมาย</h3>
                            <p>ต้องการพัฒนาทักษะด้านการเขียนโปรแกรมและสร้างผลงานที่มีคุณค่า</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
