import PageHeader from '../components/PageHeader';
import { Backpack, BookOpen, GraduationCap, Lightning, Plug, Truck } from '@phosphor-icons/react';
import Reveal from '../components/Reveal';
import './Education.css';

// สไลด์ 05 - Component: แยก TimelineItem เป็น Component ย่อย รับ props
function TimelineItem({ year, title, institution, description, roles, icon: Icon, current, delay }) {
    return (
        <Reveal className="timeline-item" delay={delay}>
            <div className="timeline-dot" aria-hidden="true"><Icon /></div>
            <div className="timeline-card chunky">
                <div className="timeline-meta">
                    <span className="timeline-year">{year}</span>
                    {current && <span className="timeline-now">กำลังเรียน</span>}
                </div>
                <h3>{title}</h3>
                <p className="institution">{institution}</p>
                {description && <p>{description}</p>}
                {roles && (
                    <ul className="timeline-roles">
                        {roles.map((role) => (
                            <li key={role.period}>
                                <span className="role-title">{role.title}</span>
                                <span className="role-period">{role.period}</span>
                            </li>
                        ))}
                    </ul>
                )}
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
        icon: GraduationCap,
        current: true,
    },
    {
        year: '2563 — 2565',
        title: 'ประกาศนียบัตรวิชาชีพ (ปวช.) ',
        institution: 'มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร วิทยาเขตพระนครเหนือ',
        description: 'สำเร็จการศึกษาระดับประกาศนียบัตรวิชาชีพ (ปวช.) สาขาช่างไฟฟ้ากำลัง',
        icon: Lightning,
    },
    {
        year: '2560 — 2562',
        title: 'มัธยมศึกษาตอนต้น',
        institution: 'โรงเรียนเทพศิรินทร์ นนทบุรี',
        description: 'สำเร็จการศึกษาระดับมัธยมศึกษาตอนต้น แผนการเรียน mep',
        icon: BookOpen,
    },
];

// ประสบการณ์การทำงาน (ล่าสุดอยู่บน)
const experienceData = [
    {
        year: '2566 — 2569',
        title: 'บริษัท อักษร โลจิสติกส์',
        institution: 'ทำงานช่วงมีนาคม – พฤษภาคม ต่อเนื่อง 4 ปี',
        icon: Truck,
        roles: [
            { title: 'พนักงานฝ่ายกระจายสินค้า', period: 'มี.ค. – พ.ค. 2569' },
            { title: 'พนักงานฝ่ายกระจายสินค้า', period: 'มี.ค. – พ.ค. 2568' },
            { title: 'พนักงานฝ่ายกระจายสินค้า', period: 'มี.ค. – พ.ค. 2567' },
            { title: 'พนักงานฝ่ายจัดส่ง', period: 'มี.ค. – มิ.ย. 2566' },
        ],
    },
    {
        year: '2564',
        title: 'การไฟฟ้านครหลวง',
        institution: 'นักศึกษาฝึกงาน',
        icon: Plug,
    },
];

function Education() {
    return (
        <div className="education-page">
            <div className="container section">
                <PageHeader icon={Backpack} label="การศึกษา" title="Education">
                    ประวัติการศึกษาและประสบการณ์การทำงานของฉัน
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

                {/* Work Experience */}
                <div className="experience-block">
                    <Reveal className="experience-head">
                        <span className="section-label">ประสบการณ์การทำงาน</span>
                        <h2 className="section-title">Work Experience</h2>
                    </Reveal>

                    <div className="timeline">
                        {experienceData.map((item, index) => (
                            <TimelineItem
                                key={item.title}
                                year={item.year}
                                title={item.title}
                                institution={item.institution}
                                roles={item.roles}
                                icon={item.icon}
                                delay={index * 120}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Education;
