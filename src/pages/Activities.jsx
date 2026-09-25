import { useState } from 'react';
import './Activities.css';

// ข้อมูลกิจกรรม (สามารถแก้ไขได้ตามต้องการ)
const activitiesData = [
    {
        id: 1,
        title: 'โครงงาน Quiz App',
        category: 'project',
        date: '2566',
        icon: '🎮',
        tag: 'Project',
        description: 'พัฒนา Quiz Application ด้วย React มีระบบคำถาม-คำตอบ ระบบคะแนน และ Timer',
        detail: 'ใช้เทคนิค State Management, Event Handling และ Component Architecture ที่เรียนจากวิชา Software Development',
    },
    {
        id: 2,
        title: 'อบรม Web Development',
        category: 'training',
        date: '2566',
        icon: '📚',
        tag: 'Training',
        description: 'เข้าร่วมอบรมการพัฒนาเว็บแอปพลิเคชันด้วย React และ REST API',
        detail: 'เรียนรู้การใช้ React Router, Form Handling, และการเชื่อมต่อกับ Backend API',
    },
    {
        id: 3,
        title: 'กิจกรรมค่ายอาสา',
        category: 'volunteer',
        date: '2565',
        icon: '🤝',
        tag: 'Volunteer',
        description: 'เข้าร่วมค่ายอาสาพัฒนาชุมชน สอนคอมพิวเตอร์เบื้องต้นให้นักเรียน',
        detail: 'สอนการใช้งานคอมพิวเตอร์และอินเทอร์เน็ตเบื้องต้นให้กับนักเรียนในพื้นที่ห่างไกล',
    },
    {
        id: 4,
        title: 'แข่งขันเขียนโปรแกรม',
        category: 'competition',
        date: '2565',
        icon: '🏆',
        tag: 'Competition',
        description: 'เข้าร่วมการแข่งขันเขียนโปรแกรมระดับมหาวิทยาลัย',
        detail: 'แข่งขันแก้ปัญหา Algorithm และ Data Structure ได้เรียนรู้ทักษะการแก้ปัญหาและการทำงานภายใต้ความกดดัน',
    },
    {
        id: 5,
        title: 'เว็บไซต์ Portfolio',
        category: 'project',
        date: '2566',
        icon: '🌐',
        tag: 'Project',
        description: 'ออกแบบและพัฒนาเว็บไซต์ Portfolio ส่วนตัวด้วย React + Vite',
        detail: 'ใช้ความรู้ที่เรียนมาทั้งหมด: Components, State, Effects, Routing, Forms มาสร้างเว็บไซต์นี้',
    },
];

const categories = [
    { key: 'all', label: 'ทั้งหมด' },
    { key: 'project', label: 'โปรเจค' },
    { key: 'training', label: 'อบรม' },
    { key: 'volunteer', label: 'อาสา' },
    { key: 'competition', label: 'แข่งขัน' },
];

function Activities() {
    // สไลด์ 07 - useState สำหรับ filter และ expand
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);

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
                <div className="activities-header">
                    <span className="section-label animate-fade-in-up">กิจกรรม</span>
                    <h2 className="section-title animate-fade-in-up delay-1" style={{ textAlign: 'center' }}>
                        Activities
                    </h2>
                    <p className="animate-fade-in-up delay-2">กิจกรรมและโปรเจคที่ฉันเคยเข้าร่วมและทำ</p>
                </div>

                {/* Filter Buttons */}
                <div className="filter-buttons animate-fade-in-up delay-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
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
                        <div
                            key={item.id}
                            className={`activity-card animate-fade-in-up delay-${Math.min(index + 2, 6)} ${expandedId === item.id ? 'expanded' : ''}`}
                            onClick={() => handleCardClick(item.id)}
                        >
                            <div className="activity-card-image">{item.icon}</div>
                            <div className="activity-card-body">
                                <span className="activity-card-tag">{item.tag}</span>
                                <h3>{item.title}</h3>
                                <p className="activity-card-date">{item.date}</p>
                                <p>{item.description}</p>
                            </div>
                            <div className="activity-card-detail">
                                <div className="activity-card-detail-inner">
                                    {item.detail}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Activities;
