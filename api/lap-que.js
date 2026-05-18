/* ========================================
   Lá»¤C HÃ€O WEBAPP - JAVASCRIPT
   All divination logic and UI interactions
   ======================================== */

// ============================================
// CONSTANTS & DATA
// ============================================

// 10 ThiÃªn Can
const CAN = ['GiÃ¡p', 'áº¤t', 'BÃ­nh', 'Äinh', 'Máº­u', 'Ká»·', 'Canh', 'TÃ¢n', 'NhÃ¢m', 'QuÃ½'];

// 12 Äá»‹a Chi
const CHI = ['TÃ½', 'Sá»­u', 'Dáº§n', 'MÃ£o', 'ThÃ¬n', 'Tá»µ', 'Ngá»', 'MÃ¹i', 'ThÃ¢n', 'Dáº­u', 'Tuáº¥t', 'Há»£i'];

// NgÅ© hÃ nh cá»§a tá»«ng Chi
const NGU_HANH_CHI = {
    'Há»£i': 'Thá»§y', 'TÃ½': 'Thá»§y',
    'Dáº§n': 'Má»™c', 'MÃ£o': 'Má»™c',
    'Tá»µ': 'Há»a', 'Ngá»': 'Há»a',
    'ThÃ¢n': 'Kim', 'Dáº­u': 'Kim',
    'ThÃ¬n': 'Thá»•', 'Tuáº¥t': 'Thá»•', 'Sá»­u': 'Thá»•', 'MÃ¹i': 'Thá»•'
};

// NgÅ© hÃ nh cá»§a 8 quÃ¡i
const NGU_HANH_QUAI = {
    'CÃ n': 'Kim', 'ÄoÃ i': 'Kim',
    'Ly': 'Há»a',
    'Cháº¥n': 'Má»™c', 'Tá»‘n': 'Má»™c',
    'Kháº£m': 'Thá»§y',
    'Cáº¥n': 'Thá»•', 'KhÃ´n': 'Thá»•'
};

// 8 QuÃ¡i Ä‘Æ¡n vá»›i mÃ£ nhá»‹ phÃ¢n
const QUAI_SO = [
    { name: 'KhÃ´n', bin: '000', hanh: 'Thá»•' },
    { name: 'Cáº¥n', bin: '001', hanh: 'Thá»•' },
    { name: 'Kháº£m', bin: '010', hanh: 'Thá»§y' },
    { name: 'Tá»‘n', bin: '011', hanh: 'Má»™c' },
    { name: 'Cháº¥n', bin: '100', hanh: 'Má»™c' },
    { name: 'Ly', bin: '101', hanh: 'Há»a' },
    { name: 'ÄoÃ i', bin: '110', hanh: 'Kim' },
    { name: 'CÃ n', bin: '111', hanh: 'Kim' }
];

// Báº£ng Mai Hoa (chuyá»ƒn sá»‘ sang 3 hÃ o)
const MAI_HOA_BITS = {
    1: [1, 1, 1], 2: [1, 1, 2], 3: [1, 2, 1], 4: [1, 2, 2],
    5: [2, 1, 1], 6: [2, 1, 2], 7: [2, 2, 1], 8: [2, 2, 2], 0: [2, 2, 2]
};

// Báº£ng Náº¡p GiÃ¡p (6 chi cho má»—i quÃ¡i)
const NAP_GIAP = {
    'CÃ n': ['TÃ½', 'Dáº§n', 'ThÃ¬n', 'Ngá»', 'ThÃ¢n', 'Tuáº¥t'],
    'Kháº£m': ['Dáº§n', 'ThÃ¬n', 'Ngá»', 'ThÃ¢n', 'Tuáº¥t', 'TÃ½'],
    'Cáº¥n': ['ThÃ¬n', 'Ngá»', 'ThÃ¢n', 'Tuáº¥t', 'TÃ½', 'Dáº§n'],
    'Cháº¥n': ['TÃ½', 'Dáº§n', 'ThÃ¬n', 'Ngá»', 'ThÃ¢n', 'Tuáº¥t'],
    'Tá»‘n': ['Sá»­u', 'Há»£i', 'Dáº­u', 'MÃ¹i', 'Tá»µ', 'MÃ£o'],
    'Ly': ['MÃ£o', 'Sá»­u', 'Há»£i', 'Dáº­u', 'MÃ¹i', 'Tá»µ'],
    'KhÃ´n': ['MÃ¹i', 'Tá»µ', 'MÃ£o', 'Sá»­u', 'Há»£i', 'Dáº­u'],
    'ÄoÃ i': ['Tá»µ', 'MÃ£o', 'Sá»­u', 'Há»£i', 'Dáº­u', 'MÃ¹i']
};

// Ma tráº­n 64 quáº»: TEN_QUE[Ngoáº¡i quÃ¡i][Ná»™i quÃ¡i]
const TEN_QUE = [
    ['BÃ¡t Thuáº§n KhÃ´n', 'Äá»‹a SÆ¡n KhiÃªm', 'Äá»‹a Thá»§y SÆ°', 'Äá»‹a Phong ThÄƒng', 'Äá»‹a LÃ´i Phá»¥c', 'Äá»‹a Há»a Minh Di', 'Äá»‹a Tráº¡ch LÃ¢m', 'Äá»‹a ThiÃªn ThÃ¡i'],
    ['SÆ¡n Äá»‹a BÃ¡c', 'BÃ¡t Thuáº§n Cáº¥n', 'SÆ¡n Thá»§y MÃ´ng', 'SÆ¡n Phong Cá»•', 'SÆ¡n LÃ´i Di', 'SÆ¡n Há»a BÃ­', 'SÆ¡n Tráº¡ch Tá»•n', 'SÆ¡n ThiÃªn Äáº¡i SÃºc'],
    ['Thá»§y Äá»‹a Tá»·', 'Thá»§y SÆ¡n Kiá»ƒn', 'BÃ¡t Thuáº§n Kháº£m', 'Thá»§y Phong Tá»‰nh', 'Thá»§y LÃ´i TruÃ¢n', 'Thá»§y Há»a KÃ½ Táº¿', 'Thá»§y Tráº¡ch Tiáº¿t', 'Thá»§y ThiÃªn Nhu'],
    ['Phong Äá»‹a Quan', 'Phong SÆ¡n Tiá»‡m', 'Phong Thá»§y HoÃ¡n', 'BÃ¡t Thuáº§n Tá»‘n', 'Phong LÃ´i Ãch', 'Phong Há»a Gia NhÃ¢n', 'Phong Tráº¡ch Trung Phu', 'Phong ThiÃªn Tiá»ƒu SÃºc'],
    ['LÃ´i Äá»‹a Dá»±', 'LÃ´i SÆ¡n Tiá»ƒu QuÃ¡', 'LÃ´i Thá»§y Giáº£i', 'LÃ´i Phong Háº±ng', 'BÃ¡t Thuáº§n Cháº¥n', 'LÃ´i Há»a Phong', 'LÃ´i Tráº¡ch Quy Muá»™i', 'LÃ´i ThiÃªn Äáº¡i TrÃ¡ng'],
    ['Há»a Äá»‹a Táº¥n', 'Há»a SÆ¡n Lá»¯', 'Há»a Thá»§y Vá»‹ Táº¿', 'Há»a Phong Äá»‰nh', 'Há»a LÃ´i Phá»‡ Háº¡p', 'BÃ¡t Thuáº§n Ly', 'Há»a Tráº¡ch KhuÃª', 'Há»a ThiÃªn Äáº¡i Há»¯u'],
    ['Tráº¡ch Äá»‹a Tá»¥y', 'Tráº¡ch SÆ¡n HÃ m', 'Tráº¡ch Thá»§y Khá»‘n', 'Tráº¡ch Phong Äáº¡i QuÃ¡', 'Tráº¡ch LÃ´i TÃ¹y', 'Tráº¡ch Há»a CÃ¡ch', 'BÃ¡t Thuáº§n ÄoÃ i', 'Tráº¡ch ThiÃªn Quáº£i'],
    ['ThiÃªn Äá»‹a BÄ©', 'ThiÃªn SÆ¡n Äá»™n', 'ThiÃªn Thá»§y Tá»¥ng', 'ThiÃªn Phong Cáº¥u', 'ThiÃªn LÃ´i VÃ´ Vá»ng', 'ThiÃªn Há»a Äá»“ng NhÃ¢n', 'ThiÃªn Tráº¡ch LÃ½', 'BÃ¡t Thuáº§n CÃ n']
];

// Danh sÃ¡ch quáº» Lá»¥c Xung (ngoÃ i BÃ¡t Thuáº§n)
const LUC_XUNG_LIST = ['ThiÃªn LÃ´i VÃ´ Vá»ng', 'LÃ´i ThiÃªn Äáº¡i TrÃ¡ng'];

// Danh sÃ¡ch quáº» Lá»¥c Há»£p
const LUC_HOP_LIST = [
    'ThiÃªn Äá»‹a BÄ©', 'Äá»‹a ThiÃªn ThÃ¡i',
    'Thá»§y Tráº¡ch Tiáº¿t', 'Tráº¡ch Thá»§y Khá»‘n',
    'SÆ¡n Há»a BÃ­', 'Há»a SÆ¡n Lá»¯',
    'Äá»‹a LÃ´i Phá»¥c', 'LÃ´i Äá»‹a Dá»±'
];

function getHexAttribute(hexName, type) {
    if (type === 'Du Há»“n') return 'Du Há»“n';
    if (type === 'Quy Há»“n') return 'Quy Há»“n';
    if (type === 'BÃ¡t Thuáº§n' || LUC_XUNG_LIST.includes(hexName)) return 'Lá»¥c Xung';
    if (LUC_HOP_LIST.includes(hexName)) return 'Lá»¥c Há»£p';
    return '';
}

// Báº£ng tra thÃ´ng tin 64 quáº» (Há» quÃ¡i, Tháº¿ hÃ o, Loáº¡i)
const HEX_MAP = {};

function initHexMap() {
    const add = (o, i, p, shi, t) => {
        HEX_MAP[(o << 3) | i] = { p, shi, type: t };
    };
    // CÃ n cung
    add(7, 7, 7, 6, 'BÃ¡t Thuáº§n'); add(7, 3, 7, 1, ''); add(7, 1, 7, 2, ''); add(7, 0, 7, 3, '');
    add(3, 0, 7, 4, ''); add(1, 0, 7, 5, ''); add(5, 0, 7, 4, 'Du Há»“n'); add(5, 7, 7, 3, 'Quy Há»“n');
    // Kháº£m cung
    add(2, 2, 2, 6, 'BÃ¡t Thuáº§n'); add(2, 6, 2, 1, ''); add(2, 4, 2, 2, ''); add(2, 5, 2, 3, '');
    add(6, 5, 2, 4, ''); add(4, 5, 2, 5, ''); add(0, 5, 2, 4, 'Du Há»“n'); add(0, 2, 2, 3, 'Quy Há»“n');
    // Cáº¥n cung
    add(1, 1, 1, 6, 'BÃ¡t Thuáº§n'); add(1, 5, 1, 1, ''); add(1, 7, 1, 2, ''); add(1, 6, 1, 3, '');
    add(5, 6, 1, 4, ''); add(7, 6, 1, 5, ''); add(3, 6, 1, 4, 'Du Há»“n'); add(3, 1, 1, 3, 'Quy Há»“n');
    // Cháº¥n cung
    add(4, 4, 4, 6, 'BÃ¡t Thuáº§n'); add(4, 0, 4, 1, ''); add(4, 2, 4, 2, ''); add(4, 3, 4, 3, '');
    add(0, 3, 4, 4, ''); add(2, 3, 4, 5, ''); add(6, 3, 4, 4, 'Du Há»“n'); add(6, 4, 4, 3, 'Quy Há»“n');
    // Tá»‘n cung
    add(3, 3, 3, 6, 'BÃ¡t Thuáº§n'); add(3, 7, 3, 1, ''); add(3, 5, 3, 2, ''); add(3, 4, 3, 3, '');
    add(7, 4, 3, 4, ''); add(5, 4, 3, 5, ''); add(1, 4, 3, 4, 'Du Há»“n'); add(1, 3, 3, 3, 'Quy Há»“n');
    // Ly cung
    add(5, 5, 5, 6, 'BÃ¡t Thuáº§n'); add(5, 1, 5, 1, ''); add(5, 3, 5, 2, ''); add(5, 2, 5, 3, '');
    add(1, 2, 5, 4, ''); add(3, 2, 5, 5, ''); add(7, 2, 5, 4, 'Du Há»“n'); add(7, 5, 5, 3, 'Quy Há»“n');
    // KhÃ´n cung
    add(0, 0, 0, 6, 'BÃ¡t Thuáº§n'); add(0, 4, 0, 1, ''); add(0, 6, 0, 2, ''); add(0, 7, 0, 3, '');
    add(4, 7, 0, 4, ''); add(6, 7, 0, 5, ''); add(2, 7, 0, 4, 'Du Há»“n'); add(2, 0, 0, 3, 'Quy Há»“n');
    // ÄoÃ i cung
    add(6, 6, 6, 6, 'BÃ¡t Thuáº§n'); add(6, 2, 6, 1, ''); add(6, 0, 6, 2, ''); add(6, 1, 6, 3, '');
    add(2, 1, 6, 4, ''); add(0, 1, 6, 5, ''); add(4, 1, 6, 4, 'Du Há»“n'); add(4, 6, 6, 3, 'Quy Há»“n');
}
initHexMap();

// 12 cung TrÆ°á»ng Sinh (viáº¿t táº¯t)
const LIFE_STAGES = ['T.Sinh', 'M.Dá»¥c', 'Q.Äá»›i', 'L.Quan', 'Ä.VÆ°á»£ng', 'Suy', 'Bá»‡nh', 'Tá»­', 'Má»™', 'Tuyá»‡t', 'Thai', 'DÆ°á»¡ng'];
const LS_START = { 'Há»a': 2, 'Kim': 5, 'Má»™c': 11, 'Thá»§y': 8, 'Thá»•': 8 };

// Lá»¥c ThÃº theo Can ngÃ y
const LUC_THU = {
    'GiÃ¡p': ['Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•', 'Huyá»n VÅ©'],
    'áº¤t': ['Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•', 'Huyá»n VÅ©'],
    'BÃ­nh': ['Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•', 'Huyá»n VÅ©', 'Thanh Long'],
    'Äinh': ['Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•', 'Huyá»n VÅ©', 'Thanh Long'],
    'Máº­u': ['CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•', 'Huyá»n VÅ©', 'Thanh Long', 'Chu TÆ°á»›c'],
    'Ká»·': ['Äáº±ng XÃ ', 'Báº¡ch Há»•', 'Huyá»n VÅ©', 'Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n'],
    'Canh': ['Báº¡ch Há»•', 'Huyá»n VÅ©', 'Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ '],
    'TÃ¢n': ['Báº¡ch Há»•', 'Huyá»n VÅ©', 'Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ '],
    'NhÃ¢m': ['Huyá»n VÅ©', 'Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•'],
    'QuÃ½': ['Huyá»n VÅ©', 'Thanh Long', 'Chu TÆ°á»›c', 'CÃ¢u Tráº§n', 'Äáº±ng XÃ ', 'Báº¡ch Há»•'],
};

// Store generated image data URL
let currentImageDataUrl = null;
let currentHexData = null;
let currentTuViData = null;
let currentTabType = 'default';

// ============================================
// CALENDAR CALCULATION (TÃ­nh Can Chi)
// ============================================

function getSolarTerm(year) {
    const termInfo = [];
    for (let i = 0; i < 24; i++) {
        termInfo.push(calculateSolarTermDate(year, i));
    }
    return termInfo;
}

function calculateSolarTermDate(year, termIndex) {
    const baseDate = new Date(Date.UTC(year, 0, 1));
    const approxDays = termIndex * 15.218 + 5.5;
    let jd = (baseDate.getTime() / 86400000) + 2440587.5 + approxDays;
    let targetLong = (285 + termIndex * 15) % 360;

    for (let k = 0; k < 3; k++) {
        const t = (jd - 2451545.0) / 36525.0;
        const L0 = 280.46646 + 36000.76983 * t;
        const M = 357.52911 + 35999.05029 * t;
        const C = (1.914602 - 0.004817 * t) * Math.sin(M * Math.PI / 180) + (0.019993) * Math.sin(2 * M * Math.PI / 180);
        let trueLong = (L0 + C) % 360;
        if (trueLong < 0) trueLong += 360;
        let error = targetLong - trueLong;
        if (error > 180) error -= 360;
        if (error < -180) error += 360;
        jd += error / 0.9856;
    }

    const z = Math.floor(jd + 0.5);
    const f = jd + 0.5 - z;
    let alpha = Math.floor((z - 1867216.25) / 36524.25);
    const a = z + 1 + alpha - Math.floor(alpha / 4);
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const d = Math.floor(365.25 * c);
    const e = Math.floor((b - d) / 30.6001);
    const day = b - d - Math.floor(30.6001 * e) + f;
    const month = e < 14 ? e - 1 : e - 13;
    const yy = month > 2 ? c - 4716 : c - 4715;
    const totalSec = Math.floor((day - Math.floor(day)) * 86400);

    return new Date(Date.UTC(yy, month - 1, Math.floor(day), Math.floor(totalSec / 3600), Math.floor((totalSec % 3600) / 60)));
}

function calculateCanChi(dateInput) {
    let d = new Date(dateInput);
    if (d.getHours() >= 23) d.setDate(d.getDate() + 1);

    const y = d.getFullYear();
    const a = Math.floor((14 - (d.getMonth() + 1)) / 12);
    const yJD = d.getFullYear() + 4800 - a;
    const mJD = (d.getMonth() + 1) + 12 * a - 3;
    const jd = d.getDate() + Math.floor((153 * mJD + 2) / 5) + 365 * yJD + Math.floor(yJD / 4) - Math.floor(yJD / 100) + Math.floor(yJD / 400) - 32045;

    const canNgayIdx = (jd + 9) % 10;
    const chiNgayIdx = (jd + 1) % 12;

    const terms = getSolarTerm(y);
    const termsPrev = getSolarTerm(y - 1);
    const lapXuan = terms[2];

    let solarYear = d < lapXuan ? y - 1 : y;
    let canNamIdx = (solarYear - 4) % 10;
    if (canNamIdx < 0) canNamIdx += 10;
    let chiNamIdx = (solarYear - 4) % 12;
    if (chiNamIdx < 0) chiNamIdx += 12;

    let chiThangIdx = 1;
    if (d >= termsPrev[22] && d < terms[0]) {
        chiThangIdx = 0;
    } else {
        const checkOrder = [22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0];
        const mapping = { 2: 2, 4: 3, 6: 4, 8: 5, 10: 6, 12: 7, 14: 8, 16: 9, 18: 10, 20: 11, 22: 0, 0: 1 };
        for (let tIdx of checkOrder) {
            if (d >= terms[tIdx]) {
                chiThangIdx = mapping[tIdx];
                break;
            }
        }
    }

    const canThangIdx = ((canNamIdx * 2 + 2) + (chiThangIdx - 2 + 12)) % 10;

    let h = d.getHours();
    const chiGioIdx = (h >= 23 || h < 1) ? 0 : Math.floor((h + 1) / 2) % 12;
    const canGioIdx = (((canNgayIdx % 5) * 2) + chiGioIdx) % 10;

    const diff = (chiNgayIdx - canNgayIdx + 12) % 12;
    const tk1 = CHI[(diff - 2 + 12) % 12];
    const tk2 = CHI[(diff - 1 + 12) % 12];

    let dayOfYear = Math.floor((d - new Date(y, 0, 0)) / 86400000);
    const termNames = ['Tiá»ƒu HÃ n', 'Äáº¡i HÃ n', 'Láº­p XuÃ¢n', 'VÅ© Thá»§y', 'Kinh Tráº­p', 'XuÃ¢n PhÃ¢n', 'Thanh Minh', 'Cá»‘c VÅ©', 'Láº­p Háº¡', 'Tiá»ƒu MÃ£n', 'Mang Chá»§ng', 'Háº¡ ChÃ­', 'Tiá»ƒu Thá»­', 'Äáº¡i Thá»­', 'Láº­p Thu', 'Xá»­ Thá»­', 'Báº¡ch Lá»™', 'Thu PhÃ¢n', 'HÃ n Lá»™', 'SÆ°Æ¡ng GiÃ¡ng', 'Láº­p ÄÃ´ng', 'Tiá»ƒu Tuyáº¿t', 'Äáº¡i Tuyáº¿t', 'ÄÃ´ng ChÃ­'];
    let tIdx = Math.floor(dayOfYear / 15.22);
    if (tIdx > 23) tIdx = 23;

    return {
        nam: { can: CAN[canNamIdx], chi: CHI[chiNamIdx] },
        thang: { can: CAN[canThangIdx], chi: CHI[chiThangIdx], hanh: NGU_HANH_CHI[CHI[chiThangIdx]] },
        ngay: { can: CAN[canNgayIdx], chi: CHI[chiNgayIdx], hanh: NGU_HANH_CHI[CHI[chiNgayIdx]] },
        gio: { can: CAN[canGioIdx], chi: CHI[chiGioIdx] },
        tuanKhong: [tk1, tk2],
        tietKhi: termNames[tIdx]
    };
}

// ============================================
// APP STATE & UI
// ============================================

let currentTab = 'coins';

function init() {
    const container = document.getElementById('linesContainer');
    for (let i = 6; i >= 1; i--) {
        const div = document.createElement('div');
        div.className = 'line-row';
        div.innerHTML = `
            <div class="line-label">HÃ o ${i}</div>
            <select id="line-${i}" class="line-select">
                <option value="yang">â”€â”€â”€ DÆ°Æ¡ng</option>
                <option value="yin">â”€ â”€ Ã‚m</option>
            </select>
            <label class="line-moving-label">
                <input type="checkbox" id="moving-${i}" class="line-moving-checkbox">
                <span class="moving-text">Äá»™ng</span>
            </label>
        `;
        container.appendChild(div);
    }

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('inputDate').value = now.toISOString().slice(0, 16);

    // Set default giá» chi for number tab
    const gioChiSelect = document.getElementById('numGioChi');
    if (gioChiSelect) {
        gioChiSelect.value = getCurrentChiHour();
    }
}

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tab}`);
    });

    // Toggle Control Sections
    // For now we only have divination-controls as Tu Vi is removed
    const divControls = document.getElementById('divination-controls');
    if (divControls) divControls.style.display = 'block';
}

function tossCoins() {
    for (let i = 1; i <= 6; i++) {
        const r = Math.random();
        // Original probability: 0=12.5%, 1=37.5%, 2=37.5%, 3=12.5%
        // 0 = LÃ£o Ã‚m (Ã‚m + Äá»™ng), 1 = Thiáº¿u DÆ°Æ¡ng (DÆ°Æ¡ng + TÄ©nh)
        // 2 = Thiáº¿u Ã‚m (Ã‚m + TÄ©nh), 3 = LÃ£o DÆ°Æ¡ng (DÆ°Æ¡ng + Äá»™ng)
        let isYang, isMoving;
        if (r < 0.125) {
            // LÃ£o Ã‚m
            isYang = false;
            isMoving = true;
        } else if (r < 0.5) {
            // Thiáº¿u DÆ°Æ¡ng
            isYang = true;
            isMoving = false;
        } else if (r < 0.875) {
            // Thiáº¿u Ã‚m
            isYang = false;
            isMoving = false;
        } else {
            // LÃ£o DÆ°Æ¡ng
            isYang = true;
            isMoving = true;
        }

        document.getElementById(`line-${i}`).value = isYang ? 'yang' : 'yin';
        document.getElementById(`moving-${i}`).checked = isMoving;
    }
}

function cleanSerialInput(el) {
    el.value = el.value.replace(/[^0-9]/g, '');
}

// Tráº£ vá» sá»‘ giá» chi (1-12) dá»±a trÃªn giá» hiá»‡n táº¡i
function getCurrentChiHour() {
    const h = new Date().getHours();
    if (h >= 23 || h < 1) return 1;  // TÃ½
    if (h < 3) return 2;   // Sá»­u
    if (h < 5) return 3;   // Dáº§n
    if (h < 7) return 4;   // MÃ£o
    if (h < 9) return 5;   // ThÃ¬n
    if (h < 11) return 6;  // Tá»µ
    if (h < 13) return 7;  // Ngá»
    if (h < 15) return 8;  // MÃ¹i
    if (h < 17) return 9;  // ThÃ¢n
    if (h < 19) return 10; // Dáº­u
    if (h < 21) return 11; // Tuáº¥t
    return 12; // Há»£i
}

// TÃ­nh vÃ  hiá»ƒn thá»‹ hÃ o Ä‘á»™ng real-time
function updateHaoDong() {
    const n1 = parseInt(document.getElementById('num1').value);
    const n2 = parseInt(document.getElementById('num2').value);
    const gioChi = parseInt(document.getElementById('numGioChi').value);
    const display = document.getElementById('haoDongDisplay');

    if (isNaN(n1) || isNaN(n2) || isNaN(gioChi)) {
        display.textContent = 'â†’ HÃ o Ä‘á»™ng: --';
        return;
    }

    const move = (n1 + n2 + gioChi) % 6 || 6;
    display.textContent = `â†’ HÃ o Ä‘á»™ng: ${move}`;
}

function formatDate(isoStr) {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    const p = n => n < 10 ? '0' + n : n;
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} - ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// ============================================
// DIVINATION PROCESSING
// ============================================

function processDivination() {
    // Original Luc Hao Logic ONLY
    // No Tu Vi check here

    const dVal = document.getElementById('inputDate').value;
    if (!dVal) {
        alert("Vui lÃ²ng chá»n ngÃ y giá» gieo quáº»!");
        return;
    }

    const calendar = calculateCanChi(dVal);
    const formattedDate = formatDate(dVal);

    let lines = [];
    let methodText = "";

    currentTabType = 'default';

    if (currentTab === 'coins') {
        for (let i = 1; i <= 6; i++) {
            const lineType = document.getElementById(`line-${i}`).value;
            const isMoving = document.getElementById(`moving-${i}`).checked;
            const isYang = (lineType === 'yang');

            // Convert to original values: 0=LÃ£o Ã‚m, 1=Thiáº¿u DÆ°Æ¡ng, 2=Thiáº¿u Ã‚m, 3=LÃ£o DÆ°Æ¡ng
            let v;
            if (isYang && isMoving) v = 3;      // LÃ£o DÆ°Æ¡ng (Äá»™ng)
            else if (isYang && !isMoving) v = 1; // Thiáº¿u DÆ°Æ¡ng (TÄ©nh)
            else if (!isYang && isMoving) v = 0; // LÃ£o Ã‚m (Äá»™ng)
            else v = 2;                          // Thiáº¿u Ã‚m (TÄ©nh)

            lines.push(v);
        }
        methodText = "Lá»¥c hÃ o";
    } else if (currentTab === 'serial') {
        const s = document.getElementById('serialInput').value;
        if (s.length < 2) {
            alert("Nháº­p Ã­t nháº¥t 2 sá»‘!");
            return;
        }

        const nums = s.split('').map(Number);
        const mid = Math.floor(nums.length / 2);
        const topSum = nums.slice(0, mid).reduce((a, b) => a + b, 0);
        const botSum = nums.slice(mid).reduce((a, b) => a + b, 0);
        const topMod = topSum % 8 || 8;
        const botMod = botSum % 8 || 8;
        const move = (topSum + botSum) % 6 || 6;

        lines = [...MAI_HOA_BITS[botMod], ...MAI_HOA_BITS[topMod]];

        const idx = move - 1;
        if (lines[idx] === 1) lines[idx] = 3;
        else lines[idx] = 0;

        methodText = `${s}`;
    } else if (currentTab === 'number') {
        const n1 = parseInt(document.getElementById('num1').value);
        const n2 = parseInt(document.getElementById('num2').value);
        const gioChi = parseInt(document.getElementById('numGioChi').value);

        if (isNaN(n1) || isNaN(n2)) {
            alert("Vui lÃ²ng nháº­p Ä‘á»§ Sá»‘ 1 vÃ  Sá»‘ 2!");
            return;
        }

        const topMod = n1 % 8 || 8;
        const botMod = n2 % 8 || 8;
        const move = (n1 + n2 + gioChi) % 6 || 6;

        lines = [...MAI_HOA_BITS[botMod], ...MAI_HOA_BITS[topMod]];

        const idx = move - 1;
        // MAI_HOA_BITS: 1=Yang, 2=Yin
        // App logic: 0=Old Yin, 1=Young Yang, 2=Young Yin, 3=Old Yang

        // Logic:
        // Yang (1) + Moving -> Old Yang (3)
        // Yin (2) + Moving -> Old Yin (0)

        if (lines[idx] === 1) lines[idx] = 3;
        else lines[idx] = 0;

        methodText = `${n1} - ${n2}`;
    }

    // Calculate hexagram data
    currentHexData = calculateHexagramData(lines, calendar, methodText, formattedDate);

    // Show loading
    document.getElementById('loading-overlay').classList.add('visible');

    // Render HTML for capture
    renderCaptureHTML(currentHexData);

    // Capture image after a short delay to ensure rendering
    // Capture image after a short delay to ensure rendering
    setTimeout(() => {
        captureAndDisplayImage();
    }, 100);
}




function getBit(val, changed) {
    if (!changed) {
        return (val === 1 || val === 3) ? '1' : '0';
    }
    return (val === 0 || val === 1) ? '1' : '0';
}

function getRelation(el, palaceEl) {
    const els = ['Kim', 'Thá»§y', 'Má»™c', 'Há»a', 'Thá»•'];
    const pI = els.indexOf(palaceEl);
    const lI = els.indexOf(el);

    if (pI === lI) return "Huynh Äá»‡";
    if ((pI + 1) % 5 === lI) return "Tá»­ TÃ´n";
    if ((lI + 1) % 5 === pI) return "Phá»¥ Máº«u";
    if ((pI + 2) % 5 === lI) return "ThÃª TÃ i";
    if ((lI + 2) % 5 === pI) return "Quan Quá»·";
    return "";
}

function getLifeStage(el, baseChi) {
    const start = LS_START[el];
    const current = CHI.indexOf(baseChi);
    const diff = (current - start + 12) % 12;
    return LIFE_STAGES[diff];
}

function renderHexVisual(lines, isChanged) {
    const bits = lines.map(v => getBit(v, isChanged));
    let html = '';

    for (let i = 5; i >= 0; i--) {
        const isMoving = (lines[i] === 0 || lines[i] === 3);
        const moveClass = isMoving ? 'moving' : '';
        html += `<div class="gua-line ${bits[i] === '1' ? 'yang' : 'yin'} ${moveClass}"></div>`;
    }

    return `<div class="gua-container">${html}</div>`;
}

function renderCaptureHTML(data) {
    const {
        mainName, changedName, palaceName, info,
        mainAttr, changedPalaceName, changedAttr,
        linesData, shensha, dateInfo, methodText, lines, formattedDate, palaceEl
    } = data;

    // Construct HTML using the prepared data
    let rowsHtml = '';

    // Lines are stored 0-5 (HÃ o 1-6), display 6-1
    for (let i = 5; i >= 0; i--) {
        const line = linesData[i];
        const rowClass = line.isMoving ? 'row-moving' : 'row-static';

        let sym = (line.val === 1) ? 'â€”' : (line.val === 2) ? '--' : (line.val === 3) ? 'O' : 'X';

        let sy = '';
        if (line.isShi) sy = `<span class="marker-the">Tháº¿</span>`;
        if (line.isYing) sy = `<span class="marker-ung">á»¨ng</span>`;

        let phucHtml = '-';
        if (line.phucThan) {
            phucHtml = `<span class="phuc-than">${line.phucThan.rel} - ${line.phucThan.branch}</span>`;
        }

        const isTK = line.isTK ? 'K' : '-';
        const isCTK = line.isCTK ? 'K' : '-';

        // Changed part (Quáº» Biáº¿n)
        let cRel = line.changed ? line.changed.relation : getRelation(line.hanh, data.palaceEl); // Default to main if not moving/changed logic handled in calc
        // Actually, for static lines, the relation is same as main if we consider it doesn't change. 
        // But in the original code: 
        // const cTriName = (i <= 3) ? QUAI_SO[cInIdx].name : QUAI_SO[cOutIdx].name;
        // const cBranch = NAP_GIAP[cTriName][idx];
        // const cEl = NGU_HANH_CHI[cBranch];
        // const cRel = getRelation(cEl, palaceEl);
        // This logic runs for ALL lines in original code.
        // In my calc function I should preserve this.

        rowsHtml += `
        <tr class="${rowClass}">
            <td>${sym}</td>
            <td>${sy}</td>
            <td>${line.relation}</td>
            <td>${line.chi}-${line.hanh}</td>
            <td>${phucHtml}</td>
            <td>${isTK}</td>
            <td class="sep-col">${line.changed.relation}</td>
            <td>${line.changed.branch}-${line.changed.hanh}</td>
            <td>${line.lucThu}</td>
            <td>${isCTK}</td>
        </tr>`;
    }

    // Render to hidden capture target
    const target = document.getElementById('captureTarget');
    target.innerHTML = `
        <div class="info-header">
            <div class="info-content">
                <div class="info-line"><strong>NgÃ y giá»:</strong> ${data.formattedDate} &nbsp;&nbsp;&nbsp;&nbsp; <strong>PhÆ°Æ¡ng phÃ¡p:</strong> <span class="highlight">${methodText}</span></div>
                <div class="info-line"><strong>Can chi:</strong> ${dateInfo.fullCanChi} &nbsp;&nbsp;&nbsp;&nbsp; <strong>Tuáº§n KhÃ´ng:</strong> <span class="highlight">${dateInfo.tuanKhong}</span></div>
                <div class="info-line"><strong>Nháº­t Tháº§n:</strong> <span class="highlight">${dateInfo.nhatThan}</span> &nbsp;&nbsp;&nbsp;&nbsp; <strong>Nguyá»‡t Lá»‡nh:</strong> <span class="highlight">${dateInfo.nguyetLenh}</span></div>
            </div>
        </div>
        
        <div class="hex-visual-section">
            <div class="hex-box">
                <div class="hex-title">${mainName}</div>
                ${renderHexVisual(data.lines, false)}
                <div class="hex-family">Há» ${palaceName}${mainAttr ? ' - ' + mainAttr : ''}</div>
            </div>
            <div class="hex-box">
                <div class="hex-title">${changedName}</div>
                ${renderHexVisual(data.lines, true)}
                <div class="hex-family">Há» ${changedPalaceName}${changedAttr ? ' - ' + changedAttr : ''}</div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>HÃ o</th>
                    <th>T/Æ¯</th>
                    <th>Lá»¥c ThÃ¢n</th>
                    <th>Can Chi</th>
                    <th>P.Tháº§n</th>
                    <th>TK</th>
                    <th class="sep-col">Lá»¥c ThÃ¢n</th>
                    <th>Can Chi</th>
                    <th>Lá»¥c ThÃº</th>
                    <th>TK</th>
                </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
        </table>
        
        <div class="shensha-section">
            <div class="shensha-title">Tháº§n SÃ¡t</div>
            <div class="shensha-grid">
                ${(() => {
            const movingChiSet = new Set();
            linesData.forEach(line => {
                if (line.isMoving) {
                    movingChiSet.add(line.chi);
                    movingChiSet.add(line.changed.branch);
                }
            });
            return shensha.map(s => {
                const nameMatch = s.match(/<strong>(.*?):<\/strong>\s*(.*)/);
                if (!nameMatch) return `<div class="ss-item">${s}</div>`;
                const name = nameMatch[1];
                const value = nameMatch[2] || '-';
                const chiValues = value.split(',').map(v => v.trim());
                const hasMovingChi = chiValues.some(chi => movingChiSet.has(chi));
                const movingClass = hasMovingChi ? ' ss-moving' : '';
                return `<div class="ss-item${movingClass}"><strong>${name}</strong><span class="ss-value">${value}</span></div>`;
            }).join('');
        })()}
            </div>
        </div>
    `;
}


function captureAndDisplayImage() {
    const captureArea = document.getElementById('captureArea');
    const target = document.getElementById('captureTarget');

    // Temporarily position capture area on screen for html2canvas
    captureArea.style.position = 'fixed';
    captureArea.style.left = '0';
    captureArea.style.top = '0';
    captureArea.style.zIndex = '-1';
    captureArea.style.opacity = '0.01';

    html2canvas(target, {
        scale: 1.5,
        useCORS: true,
        logging: false
    }).then(canvas => {
        // Hide capture area again
        captureArea.style.position = 'absolute';
        captureArea.style.left = '-9999px';
        captureArea.style.opacity = '1';

        // Convert to PNG
        currentImageDataUrl = canvas.toDataURL('image/png');

        // Display image
        const imageDisplay = document.getElementById('imageDisplay');
        imageDisplay.innerHTML = '';

        const img = document.createElement('img');
        img.src = currentImageDataUrl;
        img.alt = 'Káº¿t quáº£ quáº» Lá»¥c HÃ o';
        imageDisplay.appendChild(img);

        // Hide loading, show result
        document.getElementById('loading-overlay').classList.remove('visible');
        document.getElementById('resultSection').classList.add('visible');

        // Scroll to result
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });

    }).catch(err => {
        console.error('html2canvas error:', err);

        // Hide capture area
        captureArea.style.position = 'absolute';
        captureArea.style.left = '-9999px';
        captureArea.style.opacity = '1';

        // Hide loading
        document.getElementById('loading-overlay').classList.remove('visible');

        alert('CÃ³ lá»—i khi táº¡o áº£nh. Vui lÃ²ng thá»­ láº¡i!');
    });
}



function calculateHexagramData(lines, cal, methodText, formattedDate) {
    const mBits = lines.map(v => getBit(v, false));
    const mInBin = mBits.slice(0, 3).join('');
    const mOutBin = mBits.slice(3, 6).join('');
    const mInIdx = QUAI_SO.findIndex(q => q.bin === mInBin);
    const mOutIdx = QUAI_SO.findIndex(q => q.bin === mOutBin);

    const hexID = (mOutIdx << 3) | mInIdx;
    const info = HEX_MAP[hexID] || { p: 0, shi: 1 };
    const mainName = TEN_QUE[mOutIdx][mInIdx];
    const palaceName = QUAI_SO[info.p].name;
    const palaceEl = NGU_HANH_QUAI[palaceName];

    // XÃ¡c Ä‘á»‹nh thuá»™c tÃ­nh Quáº» ChÃ­nh
    const mainAttr = getHexAttribute(mainName, info.type);

    const cBits = lines.map(v => getBit(v, true));
    const cInIdx = QUAI_SO.findIndex(q => q.bin === cBits.slice(0, 3).join(''));
    const cOutIdx = QUAI_SO.findIndex(q => q.bin === cBits.slice(3, 6).join(''));

    const hexIDChanged = (cOutIdx << 3) | cInIdx;
    const infoChanged = HEX_MAP[hexIDChanged] || { p: 0, shi: 1, type: '' }; // Fallback info
    const changedName = TEN_QUE[cOutIdx][cInIdx];
    const changedPalaceName = QUAI_SO[infoChanged.p].name;
    const changedAttr = getHexAttribute(changedName, infoChanged.type);

    const lucThuList = LUC_THU[cal.ngay.can];

    const presentRelations = new Set();
    // First pass to find present relations
    for (let i = 0; i < 6; i++) {
        const mTriName = (i + 1 <= 3) ? QUAI_SO[mInIdx].name : QUAI_SO[mOutIdx].name;
        const mBranch = NAP_GIAP[mTriName][i];
        const mEl = NGU_HANH_CHI[mBranch];
        const mRel = getRelation(mEl, palaceEl);
        presentRelations.add(mRel);
    }

    const linesData = [];
    const movingLines = [];

    for (let i = 0; i < 6; i++) { // 0 to 5 (HÃ o 1-6)
        const lineVal = lines[i];
        const isMoving = (lineVal === 0 || lineVal === 3);
        const idx = i;

        // Main Hexagram Line
        const mTriName = (i + 1 <= 3) ? QUAI_SO[mInIdx].name : QUAI_SO[mOutIdx].name;
        const mBranch = NAP_GIAP[mTriName][i];
        const mEl = NGU_HANH_CHI[mBranch];
        const mRel = getRelation(mEl, palaceEl); // Relation to Palace defined by Main Hexagram

        const tsNgay = getLifeStage(mEl, cal.ngay.chi);
        const tsThang = getLifeStage(mEl, cal.thang.chi);

        const shi = info.shi;
        const ying = (shi + 3) > 6 ? shi - 3 : shi + 3;
        const isShi = (shi === i + 1);
        const isYing = (ying === i + 1);

        let phucThan = null;
        if (!presentRelations.has("Tá»­ TÃ´n") || !presentRelations.has("ThÃª TÃ i") ||
            !presentRelations.has("Quan Quá»·") || !presentRelations.has("Phá»¥ Máº«u") ||
            !presentRelations.has("Huynh Äá»‡")) {
            const pureTri = QUAI_SO[info.p].name;
            const pureBranch = NAP_GIAP[pureTri][i];
            const pureEl = NGU_HANH_CHI[pureBranch];
            const pureRel = getRelation(pureEl, palaceEl);
            if (!presentRelations.has(pureRel)) {
                phucThan = {
                    rel: pureRel.split(' ')[0],
                    branch: pureBranch
                };
            }
        }

        const isTK = cal.tuanKhong.includes(mBranch);

        // Changed Hexagram Line
        const cTriName = (i + 1 <= 3) ? QUAI_SO[cInIdx].name : QUAI_SO[cOutIdx].name;
        const cBranch = NAP_GIAP[cTriName][i];
        const cEl = NGU_HANH_CHI[cBranch];
        const cRel = getRelation(cEl, palaceEl);
        // Note: Relation of changed line is usually also compared to the Palace Element of the Main Hexagram in many systems.
        // The original code used `palaceEl` which was `NGU_HANH_QUAI[palaceName]` (Main Palace).
        // So `cRel` is correct as per original code.

        const isCTK = cal.tuanKhong.includes(cBranch);

        linesData.push({
            val: lineVal,
            isMoving,
            relation: mRel,
            chi: mBranch,
            hanh: mEl,
            phucThan,
            isTK,
            isShi,
            isYing,
            lucThu: lucThuList[i],
            tsNgay,
            tsThang,
            changed: {
                relation: cRel,
                branch: cBranch,
                hanh: cEl
            },
            isCTK
        });

        if (isMoving) {
            movingLines.push(i + 1);
        }
    }

    const shensha = calculateShenSha(cal.ngay.can, cal.ngay.chi, cal.thang.chi);

    // QuÃ¡i ThÃ¢n
    const shiPos = info.shi; // 1-6
    const shiLine = linesData[shiPos - 1];
    const isYang = (shiLine.val === 1 || shiLine.val === 3); // 1=yang static, 3=yang moving(old yang)
    const quaiThanMap = isYang
        ? { 1: 'TÃ½', 2: 'Sá»­u', 3: 'Dáº§n', 4: 'MÃ£o', 5: 'ThÃ¬n', 6: 'Tá»µ' }
        : { 1: 'Ngá»', 2: 'MÃ¹i', 3: 'ThÃ¢n', 4: 'Dáº­u', 5: 'Tuáº¥t', 6: 'Há»£i' };
    const quaiThanChi = quaiThanMap[shiPos];
    const existsInLines = linesData.some(l => l.chi === quaiThanChi);
    const quaiThanValue = existsInLines ? quaiThanChi : 'KhÃ´ng';
    shensha.push(`<strong>QuÃ¡i ThÃ¢n:</strong> ${quaiThanValue}`);

    // Tháº¿ ThÃ¢n
    const shiChi = shiLine.chi;
    const theThanPosMap = {
        'TÃ½': 1, 'Ngá»': 1, 'Sá»­u': 2, 'MÃ¹i': 2, 'Dáº§n': 3, 'ThÃ¢n': 3,
        'MÃ£o': 4, 'Dáº­u': 4, 'ThÃ¬n': 5, 'Tuáº¥t': 5, 'Tá»µ': 6, 'Há»£i': 6
    };
    const theThanPos = theThanPosMap[shiChi];
    const theThanLine = linesData[theThanPos - 1];
    shensha.push(`<strong>Tháº¿ ThÃ¢n:</strong> ${theThanLine.chi}`);

    return {
        mainName,
        changedName,
        palaceName,
        palaceEl,
        mainAttr,
        changedPalaceName,
        changedAttr,
        info,
        lines,  // Raw lines array
        linesData,
        shensha,
        movingLines,
        formattedDate,
        methodText,
        dateInfo: {
            fullCanChi: `Giá» ${cal.gio.can} ${cal.gio.chi}, NgÃ y ${cal.ngay.can} ${cal.ngay.chi}`,
            tietKhi: cal.tietKhi,
            tuanKhong: cal.tuanKhong.join(', '),
            nhatThan: `${cal.ngay.chi} - ${cal.ngay.hanh}`,
            nguyetLenh: `${cal.thang.chi} - ${cal.thang.hanh}`,
            nhatLenhShort: `${cal.ngay.can} ${cal.ngay.chi}`,
            nguyetLenhShort: `${cal.thang.can} ${cal.thang.chi}`,
            shenshaRaw: shensha
        }
    };
}

function generateCopyText(data) {
    const {
        mainName, changedName,
        linesData, movingLines,
        dateInfo, changedAttr, mainAttr
    } = data;

    let text = "HÃ£y Ã¡p dá»¥ng nghiÃªm ngáº·t bá»™ quy táº¯c luáº­n giáº£i Ä‘Ã£ Ä‘Æ°á»£c tÃ¹y chá»‰nh. Sá»­ dá»¥ng cháº¿ Ä‘á»™ quÃ©t chuyÃªn sÃ¢u toÃ n bá»™ cÃ¡c nguá»“n tÃ i liá»‡u trong NotebookLM vÃ  hÃ£y sá»­ dá»¥ng mÃ´ hÃ¬nh AI má»›i nháº¥t Ä‘á»ƒ phÃ¢n tÃ­ch vÃ  luáº­n giáº£i quáº» dá»‹ch dÆ°á»›i Ä‘Ã¢y: \n\n";

    // 2. Nhat/Nguyet Lenh
    text += `- Nháº­t Lá»‡nh: [${dateInfo.nhatThan}]; Nguyá»‡t Lá»‡nh: [${dateInfo.nguyetLenh}]\n`;

    // 3. Than Sat
    // 3. Than Sat
    let ssText = "";
    if (Array.isArray(dateInfo.shenshaRaw)) {
        ssText = dateInfo.shenshaRaw.map(s => s.replace(/<[^>]*>/g, '')).filter(s => !s.endsWith('-')).join('; ');
    }
    text += `- Tháº§n sÃ¡t: [${ssText}]\n`;

    // 4. Tuan Khong
    text += `- Tuáº§n khÃ´ng: ${dateInfo.tuanKhong}\n`;

    // 5. Ten Que - no instructional text
    // 5. Ten Que - no instructional text
    let queBienText = (movingLines.length > 0) ? changedName : "";
    if (movingLines.length > 0 && changedAttr) {
        queBienText += ` (${changedAttr})`;
    } else if (movingLines.length === 0) {
        queBienText = "Quáº» TÄ©nh";
    }
    let dongHaoText = "";
    if (movingLines.length > 0) {
        dongHaoText = " [" + movingLines.map(h => `Ä‘á»™ng hÃ o ${h}`).join(', ') + "]";
    }
    let mainQueText = mainName;
    if (mainAttr) {
        mainQueText += ` (${mainAttr})`;
    }
    text += `- TÃªn Quáº» Chá»§: ${mainQueText} -> TÃªn Quáº» Biáº¿n: ${queBienText}${dongHaoText}\n`;

    // 6. Lines (6 to 1) - no header with instructional text
    for (let i = 5; i >= 0; i--) {
        const line = linesData[i];
        const lineNum = i + 1;

        // Build main hexagram part
        let mainPart = `${line.lucThu} - ${line.relation} ${line.chi} ${line.hanh}`;
        if (line.isShi) mainPart += " (Tháº¿)";
        else if (line.isYing) mainPart += " (á»¨ng)";
        if (line.isTK) mainPart += " (Tuáº§n KhÃ´ng)";

        // Build changed part if moving
        let changedPart = "";
        if (line.isMoving) {
            changedPart = ` -> Äá»™ng HÃ³a ${line.changed.relation} ${line.changed.branch} ${line.changed.hanh}`;
            if (line.isCTK) changedPart += " (Tuáº§n KhÃ´ng)";
        }

        // Build phuc than part if exists
        let phucPart = "";
        if (line.phucThan) {
            phucPart = ` (Phá»¥c tháº§n: ${line.phucThan.rel} ${line.phucThan.branch})`;
        }

        text += `- HÃ o ${lineNum}: [${mainPart}]${changedPart}${phucPart};\n`;
    }

    text += "\nCÃ¢u há»i: ";

    return text;
}

function copyToClipboard() {
    if (currentTab === 'tuvi') {
        if (!currentTuViData) {
            alert("Vui lÃ²ng láº­p lÃ¡ sá»‘ trÆ°á»›c!");
            return;
        }
        const text = generateTuViText(currentTuViData);
        copyTextToClipboard(text);
        return;
    }

    if (!currentHexData) {
        alert("Vui lÃ²ng láº­p quáº» trÆ°á»›c!");
        return;
    }

    const text = generateCopyText(currentHexData);
    copyTextToClipboard(text);
}

function copyTextToClipboard(text) {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast("ÄÃ£ sao chÃ©p thÃ nh cÃ´ng!");
        }).catch(err => {
            console.error('Clipboard API failed, trying fallback: ', err);
            fallbackCopyText(text);
        });
    } else {
        // Fallback for older browsers and some mobile browsers
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Ensure it's not visible but part of the DOM
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    // Crucial for mobile: prevent keyboard, make it selectable
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('inputmode', 'none');

    document.body.appendChild(textArea);

    // iOS-specific selection
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
    } else {
        textArea.select();
        textArea.focus();
    }

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast("ÄÃ£ sao chÃ©p thÃ nh cÃ´ng!");
        } else {
            console.error('execCommand copy was unsuccessful');
            alert("KhÃ´ng thá»ƒ sao chÃ©p tá»± Ä‘á»™ng. Vui lÃ²ng thá»­ láº¡i hoáº·c chá»n vÄƒn báº£n thá»§ cÃ´ng.");
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        alert("Lá»—i khi sao chÃ©p vÄƒn báº£n.");
    }

    document.body.removeChild(textArea);
}

async function copyImageToClipboard() {
    if (!currentImageDataUrl) {
        alert("Vui lÃ²ng láº­p quáº» trÆ°á»›c!");
        return;
    }

    try {
        // Convert data URL to blob
        const response = await fetch(currentImageDataUrl);
        const blob = await response.blob();

        // Use Clipboard API to copy image
        if (navigator.clipboard && navigator.clipboard.write) {
            const clipboardItem = new ClipboardItem({
                'image/png': blob
            });
            await navigator.clipboard.write([clipboardItem]);
            showToast("ÄÃ£ sao chÃ©p áº£nh thÃ nh cÃ´ng!");
        } else {
            // Fallback: open image in new tab for manual copy
            const newTab = window.open();
            newTab.document.write(`<img src="${currentImageDataUrl}" style="max-width:100%">`);
            newTab.document.title = "Nháº¥n Ctrl+A, Ctrl+C Ä‘á»ƒ sao chÃ©p";
            showToast("Má»Ÿ tab má»›i - nháº¥n Ctrl+A, Ctrl+C Ä‘á»ƒ sao chÃ©p");
        }
    } catch (err) {
        console.error('Copy image failed:', err);
        // Fallback: open image in new tab
        const newTab = window.open();
        newTab.document.write(`<img src="${currentImageDataUrl}" style="max-width:100%">`);
        newTab.document.title = "Nháº¥n Ctrl+A, Ctrl+C Ä‘á»ƒ sao chÃ©p";
        showToast("Má»Ÿ tab má»›i - nháº¥n Ctrl+A, Ctrl+C Ä‘á»ƒ sao chÃ©p");
    }
}

function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

function downloadImage() {
    if (!currentImageDataUrl) {
        alert('ChÆ°a cÃ³ áº£nh Ä‘á»ƒ táº£i!');
        return;
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `luchao_${timestamp}.png`;

    // Detect if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Convert base64 to blob
    fetch(currentImageDataUrl)
        .then(res => res.blob())
        .then(blob => {
            if (isMobile && navigator.share && navigator.canShare) {
                // Mobile: Try Web Share API first
                const file = new File([blob], filename, { type: 'image/png' });
                const shareData = { files: [file] };

                if (navigator.canShare(shareData)) {
                    navigator.share(shareData)
                        .then(() => showToast('ÄÃ£ chia sáº» thÃ nh cÃ´ng!'))
                        .catch((err) => {
                            console.log('Share cancelled or failed, trying fallback');
                            fallbackDownload(blob, filename);
                        });
                    return;
                }
            }

            // Desktop and fallback: Direct download
            fallbackDownload(blob, filename);
            showToast('ÄÃ£ táº£i áº£nh thÃ nh cÃ´ng!');
        })
        .catch(err => {
            console.error('Download error:', err);
            // Ultimate fallback - direct link download
            const link = document.createElement('a');
            link.download = filename;
            link.href = currentImageDataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
}

function fallbackDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function calculateShenSha(dCan, dChi, mChi) {
    const list = [];

    const add = (name, val) => {
        let vStr = val || '';
        if (Array.isArray(val)) {
            vStr = val.join(', ');
        }
        if (!vStr) vStr = '-';
        list.push(`<strong>${name}:</strong> ${vStr}`);
    };

    const quy = {
        'GiÃ¡p': ['Sá»­u', 'MÃ¹i'], 'Máº­u': ['Sá»­u', 'MÃ¹i'],
        'áº¤t': ['TÃ½', 'ThÃ¢n'], 'Ká»·': ['TÃ½', 'ThÃ¢n'],
        'BÃ­nh': ['Há»£i', 'Dáº­u'], 'Äinh': ['Há»£i', 'Dáº­u'],
        'NhÃ¢m': ['MÃ£o', 'Tá»µ'], 'QuÃ½': ['MÃ£o', 'Tá»µ'],
        'Canh': ['Sá»­u', 'MÃ¹i'], 'TÃ¢n': ['Ngá»', 'Dáº§n']
    };
    add('QuÃ½ NhÃ¢n', quy[dCan]);

    const loc = { 'GiÃ¡p': 'Dáº§n', 'áº¤t': 'MÃ£o', 'BÃ­nh': 'Tá»µ', 'Máº­u': 'Tá»µ', 'Äinh': 'Ngá»', 'Ká»·': 'Ngá»', 'Canh': 'ThÃ¢n', 'TÃ¢n': 'Dáº­u', 'NhÃ¢m': 'Há»£i', 'QuÃ½': 'TÃ½' };
    add('Lá»™c Tháº§n', loc[dCan]);

    const kinh = { 'GiÃ¡p': 'MÃ£o', 'áº¤t': 'Dáº§n', 'BÃ­nh': 'Ngá»', 'Máº­u': 'Ngá»', 'Äinh': 'Tá»µ', 'Ká»·': 'Tá»µ', 'Canh': 'Dáº­u', 'TÃ¢n': 'ThÃ¢n', 'NhÃ¢m': 'TÃ½', 'QuÃ½': 'Há»£i' };
    add('DÆ°Æ¡ng Nháº­n', kinh[dCan]);

    const van = { 'GiÃ¡p': 'Tá»µ', 'áº¤t': 'Ngá»', 'BÃ­nh': 'ThÃ¢n', 'Máº­u': 'ThÃ¢n', 'Äinh': 'Dáº­u', 'Ká»·': 'Dáº­u', 'Canh': 'Há»£i', 'TÃ¢n': 'TÃ½', 'NhÃ¢m': 'Dáº§n', 'QuÃ½': 'MÃ£o' };
    add('VÄƒn XÆ°Æ¡ng', van[dCan]);

    const triadMap = {
        'ThÃ¢n': 'Thá»§y', 'TÃ½': 'Thá»§y', 'ThÃ¬n': 'Thá»§y',
        'Dáº§n': 'Há»a', 'Ngá»': 'Há»a', 'Tuáº¥t': 'Há»a',
        'Tá»µ': 'Kim', 'Dáº­u': 'Kim', 'Sá»­u': 'Kim',
        'Há»£i': 'Má»™c', 'MÃ£o': 'Má»™c', 'MÃ¹i': 'Má»™c'
    };
    const group = triadMap[dChi];

    if (group) {
        const dm = { 'Thá»§y': 'Dáº§n', 'Há»a': 'ThÃ¢n', 'Kim': 'Há»£i', 'Má»™c': 'Tá»µ' };
        add('Dá»‹ch MÃ£', dm[group]);

        const dao = { 'Thá»§y': 'Dáº­u', 'Há»a': 'MÃ£o', 'Kim': 'Ngá»', 'Má»™c': 'TÃ½' };
        add('ÄÃ o Hoa', dao[group]);

        const tuong = { 'Thá»§y': 'TÃ½', 'Há»a': 'Ngá»', 'Kim': 'Dáº­u', 'Má»™c': 'MÃ£o' };
        add('TÆ°á»›ng Tinh', tuong[group]);

        const kiep = { 'Thá»§y': 'Tá»µ', 'Há»a': 'Há»£i', 'Kim': 'Dáº§n', 'Má»™c': 'ThÃ¢n' };
        add('Kiáº¿p SÃ¡t', kiep[group]);

        const hoa = { 'Thá»§y': 'ThÃ¬n', 'Há»a': 'Tuáº¥t', 'Kim': 'Sá»­u', 'Má»™c': 'MÃ¹i' };
        add('Hoa CÃ¡i', hoa[group]);

        const muu = { 'Thá»§y': 'Tuáº¥t', 'Kim': 'MÃ¹i', 'Há»a': 'ThÃ¬n', 'Má»™c': 'Sá»­u' };
        add('MÆ°u Tinh', muu[group]);

        const tai = { 'Thá»§y': 'Ngá»', 'Há»a': 'TÃ½', 'Kim': 'MÃ£o', 'Má»™c': 'Dáº­u' };
        add('Tai SÃ¡t', tai[group]);

        const vong = { 'Thá»§y': 'Há»£i', 'Há»a': 'Tá»µ', 'Kim': 'ThÃ¢n', 'Má»™c': 'Dáº§n' };
        add('Vong Tháº§n', vong[group]);
    } else {
        for (let i = 0; i < 8; i++) add('', '');
    }

    const branches = ['TÃ½', 'Sá»­u', 'Dáº§n', 'MÃ£o', 'ThÃ¬n', 'Tá»µ', 'Ngá»', 'MÃ¹i', 'ThÃ¢n', 'Dáº­u', 'Tuáº¥t', 'Há»£i'];
    const mIdx = branches.indexOf(mChi);
    if (mIdx !== -1) {
        const ty = branches[(mIdx - 1 + 12) % 12];
        add('ThiÃªn Y', ty);
    } else {
        add('ThiÃªn Y', '-');
    }

    const muaMap = {
        'Dáº§n': 'Tuáº¥t', 'MÃ£o': 'Tuáº¥t', 'ThÃ¬n': 'Tuáº¥t',
        'Tá»µ': 'Sá»­u', 'Ngá»': 'Sá»­u', 'MÃ¹i': 'Sá»­u',
        'ThÃ¢n': 'ThÃ¬n', 'Dáº­u': 'ThÃ¬n', 'Tuáº¥t': 'ThÃ¬n',
        'Há»£i': 'MÃ¹i', 'TÃ½': 'MÃ¹i', 'Sá»­u': 'MÃ¹i'
    };
    add('ThiÃªn Há»‰', muaMap[mChi]);

    return list;
}

// ============================================
// COIN TOSS INTERACTIVE FEATURE
// ============================================

let tossResults = [];
let currentTossIndex = 1;

function startCoinToss() {
    // Reset State
    tossResults = [];
    currentTossIndex = 1;

    // Reset UI
    const modal = document.getElementById('coin-toss-modal');
    const resultsList = document.getElementById('toss-results-list');
    const tossBtn = document.getElementById('toss-btn');
    const finishBtn = document.getElementById('finish-toss-btn');
    const statusText = document.getElementById('toss-status');
    const coins = document.querySelectorAll('.coin');

    resultsList.innerHTML = '';
    tossBtn.style.display = 'inline-flex';
    tossBtn.disabled = false;
    tossBtn.innerHTML = 'Gieo HÃ o 1'; // Reset button text
    finishBtn.style.display = 'none';
    statusText.innerText = 'Sáºµn sÃ ng gieo hÃ o 1...';

    // Reset Coins Rotation
    coins.forEach(coin => {
        coin.classList.remove('tossing');
        coin.style.transform = 'rotateX(0deg)';
        const front = coin.querySelector('.front');
        const back = coin.querySelector('.back');
        if (front) front.style.transform = 'rotateX(0deg)';
        if (back) back.style.transform = 'rotateX(180deg)';
    });

    // Show Modal
    modal.classList.add('active');
}

function closeCoinTossModal() {
    document.getElementById('coin-toss-modal').classList.remove('active');
}

function performToss() {
    if (currentTossIndex > 6) return;

    const tossBtn = document.getElementById('toss-btn');
    tossBtn.disabled = true;

    const coins = document.querySelectorAll('.coin');

    // Add animation class
    coins.forEach((coin, index) => {
        coin.classList.remove('tossing');
        // Force reflow
        void coin.offsetWidth;
        coin.classList.add('tossing');
    });

    // Generate Results (The Core Random Logic)
    // 3 Independent Coins: True = Yang (Front/Duong), False = Yin (Back/Am)
    const r1 = Math.random() < 0.5;
    const r2 = Math.random() < 0.5;
    const r3 = Math.random() < 0.5;

    const coinResults = [r1, r2, r3];
    const yangCount = coinResults.filter(r => r).length;

    // Calculate Line Result
    // 0 Yang -> LÃ£o Ã‚m (Line 0)
    // 1 Yang -> Thiáº¿u DÆ°Æ¡ng (Line 1)
    // 2 Yang -> Thiáº¿u Ã‚m (Line 2)
    // 3 Yang -> LÃ£o DÆ°Æ¡ng (Line 3)
    let lineValue, lineText, lineSymbol;
    let isMoving = false;
    let isYangLine = false;

    if (yangCount === 0) {
        lineValue = 0; // LÃ£o Ã‚m
        lineText = "LÃ£o Ã‚m (Ã‚m Ä‘á»™ng)";
        lineSymbol = "X";
        isMoving = true;
        isYangLine = false; // Ã‚m
    } else if (yangCount === 1) {
        lineValue = 1; // Thiáº¿u DÆ°Æ¡ng
        lineText = "Thiáº¿u DÆ°Æ¡ng (DÆ°Æ¡ng tÄ©nh)";
        lineSymbol = "â€”";
        isMoving = false;
        isYangLine = true; // DÆ°Æ¡ng
    } else if (yangCount === 2) {
        lineValue = 2; // Thiáº¿u Ã‚m
        lineText = "Thiáº¿u Ã‚m (Ã‚m tÄ©nh)";
        lineSymbol = "--";
        isMoving = false;
        isYangLine = false; // Ã‚m
    } else {
        lineValue = 3; // LÃ£o DÆ°Æ¡ng
        lineText = "LÃ£o DÆ°Æ¡ng (DÆ°Æ¡ng Ä‘á»™ng)";
        lineSymbol = "O";
        isMoving = true;
        isYangLine = true; // DÆ°Æ¡ng
    }

    tossResults.push({
        value: lineValue,
        isYang: isYangLine,
        isMoving: isMoving,
        yangCount: yangCount,
        coinDetails: coinResults
    });

    // Wait for animation to finish (1.5s match CSS)
    setTimeout(() => {
        // Stop Animation & Set Final State
        coins.forEach((coin, index) => {
            coin.classList.remove('tossing');

            // Animation ends at 2160deg (6 full spins)
            // If Result is Yang (Front): 2160deg
            // If Result is Yin (Back): 2160 + 180 = 2340deg
            const isYang = coinResults[index];
            const finalAngle = 2160 + (isYang ? 0 : 180);
            coin.style.transform = `rotateX(${finalAngle}deg)`;
        });

        // Update Results UI
        addResultToStack(currentTossIndex, lineText, lineSymbol, isMoving);

        // Prepare next step
        currentTossIndex++;

        if (currentTossIndex <= 6) {
            tossBtn.innerHTML = `Gieo HÃ o ${currentTossIndex}`;
            tossBtn.disabled = false;
            document.getElementById('toss-status').innerText = `Sáºµn sÃ ng gieo hÃ o ${currentTossIndex}...`;
        } else {
            tossBtn.style.display = 'none';
            document.getElementById('finish-toss-btn').style.display = 'inline-flex';
            document.getElementById('toss-status').innerText = "ÄÃ£ gieo xong 6 hÃ o!";
        }

    }, 1500);
}

function addResultToStack(index, text, symbol, isMoving) {
    const container = document.getElementById('toss-results-list');
    const row = document.createElement('div');
    row.className = `result-row ${isMoving ? 'moving' : ''}`;
    row.innerHTML = `
        <div class="result-label">HÃ o ${index}</div>
        <div class="result-value">
            <span class="result-text">${text}</span>
            <span class="result-symbol">${symbol}</span>
        </div>
    `;
    // Append (Flex column-reverse will show it at top)
    container.appendChild(row);

    // Auto scroll logic might be inverted due to column-reverse or just work naturally
    // With column-reverse, "scrollTop" might refer to the bottom.
    // It's safer to just set scrollTop to 0 or scrollHeight.
    // Actually, usually with column-reverse, the scrollbar stays at the bottom (which is visually top?).
    // Let's force scroll to the "end" of content, which is physically the bottom.
    container.scrollTop = container.scrollHeight;
}

function finishTossSequence() {
    // Populate Main Form
    // tossResults[0] is HÃ o 1 (Result of first toss) -> #line-1
    tossResults.forEach((res, idx) => {
        const lineNum = idx + 1;
        const select = document.getElementById(`line-${lineNum}`);
        const checkbox = document.getElementById(`moving-${lineNum}`);

        if (!select || !checkbox) return;

        select.value = res.isYang ? 'yang' : 'yin';
        checkbox.checked = res.isMoving;
    });

    closeCoinTossModal();
}

// ============================================
// INITIALIZE ON LOAD
// ============================================
// DOM removed

// End of Divination functions

export default function handler(req, res) {
    const serial = req.query.serial;
    if (!serial) {
        return res.status(400).json({ error: 'Missing serial' });
    }

    try {
        const dVal = new Date().toISOString();
        const calendar = calculateCanChi(dVal);
        const formattedDate = formatDate(dVal) || dVal;

        const nums = serial.split('').map(Number);
        const mid = Math.floor(nums.length / 2);
        const topSum = nums.slice(0, mid).reduce((a, b) => a + b, 0);
        const botSum = nums.slice(mid).reduce((a, b) => a + b, 0);
        const topMod = topSum % 8 || 8;
        const botMod = botSum % 8 || 8;
        const move = (topSum + botSum) % 6 || 6;

        let lines = [...MAI_HOA_BITS[botMod], ...MAI_HOA_BITS[topMod]];
        const idx = move - 1;
        if (lines[idx] === 1) lines[idx] = 3;
        else lines[idx] = 0;

        const data = calculateHexagramData(lines, calendar, serial, formattedDate);

        res.status(200).json({
            success: true,
            serial: serial,
            quaiChinh: data.mainName,
            quaiBien: data.changedName,
            haoDong: move,
            data: data
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
