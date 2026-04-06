function pad2(value) {
    return String(value).padStart(2, '0');
}

function isValidDateParts(day, month, year) {
    if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    return true;
}

function parseMixedDate(input) {
    const raw = String(input || '').trim();
    if (!raw) return null;

    const datePart = raw.split('T')[0].split(' ')[0];
    const separator = datePart.includes('/') ? '/' : datePart.includes('-') ? '-' : null;
    if (!separator) return null;

    const parts = datePart.split(separator);
    if (parts.length !== 3) return null;

    const a = Number(parts[0]);
    const b = Number(parts[1]);
    const c = Number(parts[2]);

    let day;
    let month;
    let year;

    if (parts[0].length === 4) {
        // Internal/API format YYYY-MM-DD.
        year = a;
        month = b;
        day = c;
    } else if (parts[2].length === 4) {
        // Day-first input/output format DD-MM-YYYY.
        day = a;
        month = b;
        year = c;
    } else {
        return null;
    }

    if (!isValidDateParts(day, month, year)) return null;
    return { day, month, year };
}

export function formatDateDDMMYYYY(input) {
    const parsed = parseMixedDate(input);
    if (!parsed) return input || '';
    return `${pad2(parsed.day)}-${pad2(parsed.month)}-${parsed.year}`;
}
