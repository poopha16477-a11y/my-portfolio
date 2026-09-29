import { splitGraphemes } from '../utils/graphemes';

// ข้อความที่ตัวอักษรแต่ละตัวเด้งเมื่อเอาเมาส์ไปชี้
function BouncyText({ text, className = '' }) {
    return (
        <span className={`bouncy ${className}`} aria-label={text}>
            {splitGraphemes(text).map((ch, i) => (
                <span key={i} className="bouncy-char" aria-hidden="true">
                    {ch === ' ' ? ' ' : ch}
                </span>
            ))}
        </span>
    );
}

export default BouncyText;
