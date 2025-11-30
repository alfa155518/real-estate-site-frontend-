export const parseArabicNumber = (value: string | number | null | undefined): number => {
    if (value === null || value === undefined || value === '') return 0;
    if (typeof value === 'number') return value;

    const englishDigits = value
        .toString()
        .replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);

    const parsed = parseFloat(englishDigits);
    return isNaN(parsed) ? 0 : parsed;
};
