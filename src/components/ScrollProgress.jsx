import { useEffect, useRef } from 'react';

// แถบบอกความคืบหน้าการเลื่อนหน้า (อัปเดตผ่าน style โดยตรง ไม่ re-render)
function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? window.scrollY / max : 0;
            if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}

export default ScrollProgress;
