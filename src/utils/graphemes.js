// แยกข้อความเป็นตัวอักษร (grapheme) เพื่อให้สระ/วรรณยุกต์ไทยไม่หลุดจากพยัญชนะ
export function splitGraphemes(text) {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        return [...new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(text)].map((s) => s.segment);
    }
    return [text];
}
