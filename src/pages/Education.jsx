import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import './Education.css';

// สไลด์ 05 - Component: แยก TimelineItem เป็น Component ย่อย รับ props
function TimelineItem({ year, title, institution, description, icon, current, delay }) {
    return (
        <Reveal className="timeline-item" delay={delay}>
            <div className="timeline-dot" aria-hidden="true">{icon}</div>
            <div className="timeline-card chunky">
                <div className="timeline-meta">
                    <span className="timeline-year">{year}</span>
                    {current && <span className="timeline-now">กำลังเรียน</span>}
                </div>
                <h3>{title}</h3>
                <p className="institution">{institution}</p>
                <p>{description}</p>
            </div>
        </Reveal>
    );
}

// ข้อมูลประวัติการศึกษา (สามารถแก้ไขได้ตามต้องการ)
const educationData = [
    {
        year: '2566 — ปัจจุบัน',
        title: 'ปริญญาตรี สาขาเทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์แขนงคอมพิวเตอร์',
        institution: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ',
        description: 'กำลังศึกษาในระดับปริญญาตรี เรียนรู้เกี่ยวกับการพัฒนาซอฟต์แวร์ เว็บแอปพลิเคชัน และเทคโนโลยีสมัยใหม่',
        icon: '🎓',
        current: true,
    },
    {
        year: '2563 — 2565',
        title: 'ประกาศนียบัตรวิชาชีพ (ปวช.) ',
        institution: 'มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร วิทยาเขตพระนครเหนือ',
        description: 'สำเร็จการศึกษาระดับประกาศนียบัตรวิชาชีพ (ปวช.) สาขาช่างไฟฟ้ากำลัง',
        icon: '⚡',
    },
    {
        year: '2560 — 2562',
        title: 'มัธยมศึกษาตอนต้น',
        institution: 'โรงเรียนเทพศิรินทร์ นนทบุรี',
        description: 'สำเร็จการศึกษาระดับมัธยมศึกษาตอนต้น แผนการเรียน mep',
        icon: '📘',
    },
];

function Education() {
    return (
        <div className="education-page">
            <div className="container section">
                <PageHeader emoji="🎒" label="การศึกษา" title="Education">
                    ประวัติการศึกษาของฉัน ตั้งแต่อดีตจนถึงปัจจุบัน
                </PageHeader>

                <div className="timeline">
                    {educationData.map((item, index) => (
                        <TimelineItem
                            key={index}
                            year={item.year}
                            title={item.title}
                            institution={item.institution}
                            description={item.description}
                            icon={item.icon}
                            current={item.current}
                            delay={index * 120}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Education;
