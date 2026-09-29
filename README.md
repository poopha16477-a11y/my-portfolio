# ภูผา สนานคุณ — Portfolio

เว็บไซต์ Portfolio ส่วนตัว แสดงข้อมูลส่วนตัว ประวัติการศึกษา กิจกรรม/ผลงาน และช่องทางติดต่อ

**Live:** https://projectreact-six.vercel.app

## Tech stack

- React 19 + React Router 7
- Vite 8
- CSS ล้วน (ไม่ใช้ UI library)
- EmailJS สำหรับฟอร์มติดต่อ
- Deploy บน Vercel (auto-deploy เมื่อ push เข้า `main`)

## เริ่มต้นใช้งาน

```bash
npm install
npm run dev
```

คำสั่งอื่นๆ: `npm run build`, `npm run preview`, `npm run lint`

## ตั้งค่าฟอร์มติดต่อ (EmailJS)

ฟอร์มหน้า Contact ส่งอีเมลผ่าน [EmailJS](https://www.emailjs.com) โดยใช้ค่า 3 ตัวใน `.env.example`
(`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`)
Template ใช้ตัวแปร `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`
ถ้าไม่ได้ตั้งค่า ฟอร์มจะเปิดแอปอีเมลพร้อมข้อความที่กรอกไว้แทน

## โครงสร้าง

```
src/
  components/   Navbar, Footer, Layout, PageHeader, BouncyText
  pages/        Home, Education, Activities, Contact
  utils/        ฟังก์ชันช่วย (ตัดคำภาษาไทย)
  index.css     design tokens และสไตล์ที่ใช้ร่วมกัน
```

ข้อมูลที่แก้บ่อย เช่น รายการทักษะ (`SKILLS` ใน `Home.jsx`), ประวัติการศึกษา (`Education.jsx`)
และกิจกรรม (`Activities.jsx`) อยู่เป็น array ด้านบนของแต่ละไฟล์
