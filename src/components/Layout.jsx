import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';

function Layout() {
    const location = useLocation();

    // Scroll to top on route change (สไลด์ 08 - useEffect)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return (
        <div className="app-layout">
            <ScrollProgress />
            <Navbar />
            <main className="main-content">
                {/* key ตาม path เพื่อให้เล่นแอนิเมชันเปลี่ยนหน้าทุกครั้ง */}
                <div key={location.pathname} className="page-transition">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
