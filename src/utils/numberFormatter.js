export const formatNumber = (number, locales = 'en-US', options = {}) => {
    return new Intl.NumberFormat(locales, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        ...options
    }).format(number);
};