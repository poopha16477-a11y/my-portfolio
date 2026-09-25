import './Education.css';

// สไลด์ 05 - Component: แยก TimelineItem เป็น Component ย่อย รับ props
function TimelineItem({ year, title, institution, description, delay }) {
    return (
        <div className={`timeline-item animate-fade-in-up delay-${delay}`}>
            <div className="timeline-dot"></div>
            <span className="timeline-year">{year}</span>
            <div className="timeline-card">
                <h3>{title}</h3>
                <p className="institution">{institution}</p>
                <p>{description}</p>
            </div>
        </div>
    );
}

// ข้อมูลประวัติการศึกษา (สามารถแก้ไขได้ตามต้องการ)
const educationData = [
    {
        year: '2566 — ปัจจุบัน',
        title: 'ปริญญาตรี สาขาเทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์แขนงคอมพิวเตอร์',
        institution: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
        description: 'กำลังศึกษาในระดับปริญญาตรี เรียนรู้เกี่ยวกับการพัฒนาซอฟต์แวร์ เว็บแอปพลิเคชัน และเทคโนโลยีสมัยใหม่',
    },
    {
        year: '2563 — 2565',
        title: 'ประกาศนียบัตรวิชาชีพ (ปวช.) ',
        institution: 'มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร วิทยาเขตพระนครเหนือ',
        description: 'สำเร็จการศึกษาระดับประกาศนียบัตรวิชาชีพ (ปวช.) สาขาช่างไฟฟ้ากำลัง',
    },
    {
        year: '2560 — 2562',
        title: 'มัธยมศึกษาตอนต้น',
        institution: 'โรงเรียนเทพศิรินทร์ นนทบุรี',
        description: 'สำเร็จการศึกษาระดับมัธยมศึกษาตอนต้น แผนการเรียน mep',
    },
];

function Education() {
    return (
        <div className="education-page">
            <div className="container section">
                <div className="education-header">
                    <span className="section-label animate-fade-in-up">การศึกษา</span>
                    <h2 className="section-title animate-fade-in-up delay-1" style={{ textAlign: 'center' }}>
                        Education
                    </h2>
                    <p className="animate-fade-in-up delay-2">ประวัติการศึกษาของฉัน ตั้งแต่อดีตจนถึงปัจจุบัน</p>
                </div>

                <div className="timeline">
                    {educationData.map((item, index) => (
                        <TimelineItem
                            key={index}
                            year={item.year}
                            title={item.title}
                            institution={item.institution}
                            description={item.description}
                            delay={index + 2}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Education;
