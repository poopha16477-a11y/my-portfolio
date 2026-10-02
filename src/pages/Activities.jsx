import { useState } from 'react';
import { Barbell, Buildings, Globe, HandHeart, RocketLaunch } from '@phosphor-icons/react';
import Lightbox from '../components/Lightbox';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import './Activities.css';

// ข้อมูลกิจกรรม (สามารถแก้ไขได้ตามต้องการ)
const activitiesData = [
    {
        id: 1,
        title: 'เครื่องออกกำลังกายสำหรับขา',
        category: 'project',
        date: '2569',
        icon: Barbell,
        image: '/projects/leg-exercise-machine.webp',
        tag: 'Project',
        description: 'เครื่องปั่นขาอัตโนมัติสำหรับผู้สูงอายุและผู้ป่วยที่กล้ามเนื้อขาอ่อนแรง ควบคุมผ่านหน้าจอสัมผัส ปรับความเร็วได้ 5 ระดับ และวัดอัตราการเต้นของหัวใจได้',
        detail: 'ใช้มอเตอร์ DC 24V 350W ติดเกียร์ ควบคุมความเร็วด้วย PWM ผ่าน Arduino Uno นับรอบการปั่นด้วย Proximity Sensor มี Raspberry Pi เป็น Server กลาง สื่อสารกับอุปกรณ์ผ่าน MQTT ด้วย Python และเก็บข้อมูลผู้ใช้กับสถานะการออกกำลังกายด้วย SQL (โครงงานทีม 2 คน)',
        tech: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT', 'SQL'],
    },
    {
        id: 3,
        title: 'กิจกรรมอาสาประจำปี',
        category: 'volunteer',
        date: 'ทุกปี',
        icon: HandHeart,
        image: '/projects/volunteer-2.webp',
        imageStyle: 'photo',
        tag: 'Volunteer',
        description: 'ในทุกๆ ปีจะไปทำกิจกรรมอาสา แจกของ และทำอาหารเลี้ยงนักเรียนในถิ่นทุรกันดาร รวมถึงไปมอบเสบียงให้เจ้าหน้าที่ตามแนวชายแดน',
        detail: 'ร่วมกับกลุ่มอาสาเดินทางเข้าไปในพื้นที่ห่างไกล ขนของบริจาคไปมอบให้โรงเรียนและชุมชน ทำอาหารเลี้ยงและเล่นเกมกับน้องๆ นักเรียน และนำเสบียงไปมอบให้ทหารพรานที่ประจำการตามแนวชายแดน',
        gallery: [
            { src: '/projects/volunteer-1.webp', caption: 'มอบเสบียงให้ทหารพรานตามแนวชายแดน' },
            { src: '/projects/volunteer-2.webp', caption: 'ทำกิจกรรมกับน้องๆ นักเรียน' },
            { src: '/projects/volunteer-3.webp', caption: 'ช่วยทำอาหารเลี้ยงน้องๆ' },
            { src: '/projects/volunteer-4.webp', caption: 'เล่นเกมกับน้องๆ ในโรงเรียน' },
            { src: '/projects/volunteer-5.webp', caption: 'ขนของบริจาคเข้าพื้นที่' },
            { src: '/projects/volunteer-6.webp', caption: 'มอบสิ่งของบริจาคให้ชุมชน' },
            { src: '/projects/volunteer-7.webp', caption: 'แจกขนมให้น้องๆ' },
            { src: '/projects/volunteer-8.webp', caption: 'เลี้ยงอาหารนักเรียนในพื้นที่ห่างไกล' },
        ],
    },
    {
        id: 4,
        title: 'AMS — ระบบจัดการหอพัก',
        category: 'project',
        date: '2568',
        icon: Buildings,
        image: '/projects/ams-admin-dashboard.webp',
        imageStyle: 'screenshot',
        tag: 'Project',
        description: 'Apartment Management System เว็บจัดการหอพักแยกฝั่ง Admin และผู้เช่า จัดการห้องพัก จดมิเตอร์น้ำ-ไฟ คำนวณค่าเช่าอัตโนมัติ ออกใบแจ้งหนี้ QR พร้อมเพย์ และแจ้งซ่อมออนไลน์',
        detail: 'พัฒนาแบบ Agile (Scrum) 3 Sprint เริ่มจากเก็บ Requirement ด้วยแบบสอบถามกับผู้ดูแลหอและผู้เช่า ออกแบบระบบด้วย Use Case, Class, Activity และ ER Diagram และใช้ Design Pattern 4 แบบ ได้แก่ Proxy (ตรวจสิทธิ์ Admin/ผู้เช่า), Strategy (สูตรคำนวณบิล), Observer (ระบบแจ้งเตือน) และ Facade (ระบบแจ้งซ่อม) ตัวระบบเขียนด้วย PHP เชื่อมต่อฐานข้อมูล PostgreSQL ผ่าน PDO และวางแผนนำขึ้นใช้งานจริงด้วย Docker',
        tech: ['PHP', 'PostgreSQL', 'HTML', 'CSS', 'Scrum', 'UML', 'Design Patterns'],
        links: [
            { label: 'Source code', href: 'https://github.com/nowsirasak/Apartment_System' },
        ],
        gallery: [
            { src: '/projects/ams-login.webp', caption: 'หน้าเข้าสู่ระบบ Admin' },
            { src: '/projects/ams-admin-dashboard.webp', caption: 'Dashboard ฝั่ง Admin' },
            { src: '/projects/ams-rooms.webp', caption: 'จัดการข้อมูลห้องพัก' },
            { src: '/projects/ams-admin-billing.webp', caption: 'จัดการบิลค่าใช้จ่ายและตรวจสลิป' },
            { src: '/projects/ams-tenant-signup.webp', caption: 'สมัครสมาชิกฝั่งผู้เช่า' },
            { src: '/projects/ams-tenant-dashboard.webp', caption: 'หน้าหลักฝั่งผู้เช่า' },
            { src: '/projects/ams-tenant-booking.webp', caption: 'จองห้องพักฝั่งผู้เช่า' },
            { src: '/projects/ams-tenant-repair.webp', caption: 'แจ้งซ่อมของชำรุดฝั่งผู้เช่า' },
        ],
    },
    {
        id: 5,
        title: 'เว็บไซต์ Portfolio',
        category: 'project',
        date: '2566',
        icon: Globe,
        tag: 'Project',
        description: 'ออกแบบและพัฒนาเว็บไซต์ Portfolio ส่วนตัวด้วย React + Vite',
        detail: 'ใช้ความรู้ที่เรียนมาทั้งหมด: Components, State, Effects, Routing, Forms มาสร้างเว็บไซต์นี้',
        links: [
            { label: 'Source code', href: 'https://github.com/poopha16477-a11y/my-portfolio' },
            { label: 'Live site', href: 'https://projectreact-six.vercel.app' },
        ],
    },
];

const categories = [
    { key: 'all', label: 'All' },
    { key: 'project', label: 'Projects' },
    { key: 'volunteer', label: 'Volunteer' },
];

function Activities() {
    // สไลด์ 07 - useState สำหรับ filter และ expand
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    // รูปที่เปิดดูขนาดใหญ่: { images, index } หรือ null
    const [viewer, setViewer] = useState(null);

    // สไลด์ 06 - Event Handling
    const handleFilterClick = (category) => {
        setActiveFilter(category);
        setExpandedId(null);
    };

    const handleCardClick = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredActivities = activeFilter === 'all'
        ? activitiesData
        : activitiesData.filter((item) => item.category === activeFilter);

    return (
        <div className="activities-page">
            <div className="container section">
                <PageHeader icon={RocketLaunch} label="กิจกรรม" title="Activities">
                    กิจกรรมและโปรเจคที่ฉันเคยเข้าร่วมและทำ
                </PageHeader>

                {/* Filter Buttons */}
                <div className="filter-buttons animate-fade-in-up delay-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            type="button"
                            className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                            onClick={() => handleFilterClick(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Activity Cards */}
                <div className="activities-grid">
                    {filteredActivities.map((item, index) => (
                        <Reveal
                            key={`${activeFilter}-${item.id}`}
                            delay={(index % 3) * 110}
                            role="button"
                            tabIndex={0}
                            aria-expanded={expandedId === item.id}
                            className={`activity-card chunky cat-${item.category} ${expandedId === item.id ? 'expanded' : ''}`}
                            onClick={() => handleCardClick(item.id)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCardClick(item.id);
                                }
                            }}
                        >
                            <div className={`activity-card-image ${item.image ? 'has-photo' : ''} ${item.imageStyle ? `is-${item.imageStyle}` : ''}`}>
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="activity-card-photo" loading="lazy" />
                                ) : (
                                    <span className="activity-card-emoji" aria-hidden="true"><item.icon /></span>
                                )}
                                <span className="activity-card-tag">{item.tag}</span>
                            </div>
                            <div className="activity-card-body">
                                {item.date && <p className="activity-card-date">{item.date}</p>}
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                {item.tech && (
                                    <ul className="activity-card-tech">
                                        {item.tech.map((t) => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="activity-card-detail">
                                <div className="activity-card-detail-clip">
                                    <div className="activity-card-detail-inner">
                                        {item.detail}
                                        {item.gallery && (
                                            <span className="activity-card-gallery">
                                                {item.gallery.map((img, i) => (
                                                    <button
                                                        key={img.src}
                                                        type="button"
                                                        className="gallery-thumb"
                                                        tabIndex={expandedId === item.id ? 0 : -1}
                                                        aria-label={`ดูรูป: ${img.caption}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setViewer({ images: item.gallery, index: i });
                                                        }}
                                                        onKeyDown={(e) => e.stopPropagation()}
                                                    >
                                                        <img src={img.src} alt="" loading="lazy" />
                                                        <span>{img.caption}</span>
                                                    </button>
                                                ))}
                                            </span>
                                        )}
                                        {item.links && (
                                            <span className="activity-card-links">
                                                {item.links.map((link) => (
                                                    <a
                                                        key={link.href}
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        tabIndex={expandedId === item.id ? 0 : -1}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {link.label} ↗
                                                    </a>
                                                ))}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span className="activity-card-toggle" aria-hidden="true">
                                {expandedId === item.id ? 'Show less' : 'Read more'} <span className="toggle-plus">+</span>
                            </span>
                        </Reveal>
                    ))}
                </div>
            </div>

            {viewer && (
                <Lightbox
                    images={viewer.images}
                    index={viewer.index}
                    onClose={() => setViewer(null)}
                    onChange={(index) => setViewer({ ...viewer, index })}
                />
            )}
        </div>
    );
}

export default Activities;
