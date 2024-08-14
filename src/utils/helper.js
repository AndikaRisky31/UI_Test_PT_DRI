export const getColorClasses = (level) => {
    switch (level) {
        case 'warga':
            return {
                bgColor: 'bg-stone-50',
                textColor: 'text-orange-400',
            };
        case 'juragan':
            return {
                bgColor: 'bg-slate-50',
                textColor: 'text-cyan-300',
            };
        case 'sultan':
            return {
                bgColor: 'bg-teal-50',
                textColor: 'text-blue-700',
            };
        case 'konglomerat':
            return {
                bgColor: 'bg-fuchsia-50',
                textColor: 'text-fuchsia-600',
            };
        default:
            return {
                bgColor: 'bg-slate-50',
                textColor: 'text-cyan-300',
            };
    }
};