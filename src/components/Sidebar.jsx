import React from 'react';
import MenuItem from './MenuItem';
import { Category2, BatteryFull, Profile2User, Reserve, MouseSquare, Document, UserSquare, Candle, ShoppingCart, Truck, LogoutCurve } from 'iconsax-react';

const Sidebar = () => {
  const menuItems = [
    {
      title: 'Menu',
      items: [
        { to: '/', label: 'Dashboard', badgeCount: 4, icon: Category2 },
        { to: '/stock', label: 'Stock', icon: BatteryFull },
        { to: '/customer', label: 'Customer', icon: Profile2User },
        { to: '/restaurant', label: 'Restaurant', icon: Reserve },
        { to: '/design', label: 'Design', icon: MouseSquare },
        { to: '/report', label: 'Report', icon: Document },
        { to: '/role-admin', label: 'Role & Admin', icon: UserSquare },
        { to: '/settings', label: 'Settings', icon: Candle }
      ]
    },
    {
      title: 'Integration',
      items: [
        { to: '/stock2', label: 'Stock', icon: ShoppingCart },
        { to: '/supply', label: 'Supply', icon: Truck }
      ]
    }
  ];

  return (
    <div className="w-56 h-screen bg-white border-r-2 border-neutral-300/40 flex flex-col">
        <div className="p-6 order-1 flex items-center gap-1">
            <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_1_204" fill="white">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.6419 7.24008C7.21338 3.39899 3.95546 0.412506 0 0.412506V16.075V16.1625H0.000419469C0.047311 21.0513 4.01966 25 8.91304 25C13.8356 25 17.8261 21.0041 17.8261 16.075C17.8261 11.1459 13.8356 7.15001 8.91304 7.15001C8.48147 7.15001 8.05707 7.18072 7.6419 7.24008Z"/>
                </mask>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.6419 7.24008C7.21338 3.39899 3.95546 0.412506 0 0.412506V16.075V16.1625H0.000419469C0.047311 21.0513 4.01966 25 8.91304 25C13.8356 25 17.8261 21.0041 17.8261 16.075C17.8261 11.1459 13.8356 7.15001 8.91304 7.15001C8.48147 7.15001 8.05707 7.18072 7.6419 7.24008Z" fill="#5D5FEF"/>
                <path d="M0 0.412506V0.0627407H-0.349765V0.412506H0ZM7.6419 7.24008L7.29429 7.27886L7.33428 7.63739L7.6914 7.58633L7.6419 7.24008ZM0 16.1625H-0.349765V16.5123H0V16.1625ZM0.000419469 16.1625L0.350169 16.1592L0.346846 15.8127H0.000419469V16.1625ZM0 0.762272C3.7753 0.762272 6.8853 3.61285 7.29429 7.27886L7.9895 7.2013C7.54146 3.18513 4.13561 0.0627407 0 0.0627407V0.762272ZM0.349765 16.075V0.412506H-0.349765V16.075H0.349765ZM0.349765 16.1625V16.075H-0.349765V16.1625H0.349765ZM0.000419469 15.8127H0V16.5123H0.000419469V15.8127ZM8.91304 24.6502C4.21215 24.6502 0.395226 20.8568 0.350169 16.1592L-0.34933 16.1659C-0.300604 21.2459 3.82718 25.3498 8.91304 25.3498V24.6502ZM17.4763 16.075C17.4763 20.8114 13.642 24.6502 8.91304 24.6502V25.3498C14.0292 25.3498 18.1758 21.1969 18.1758 16.075H17.4763ZM8.91304 7.49977C13.642 7.49977 17.4763 11.3386 17.4763 16.075H18.1758C18.1758 10.9531 14.0292 6.80024 8.91304 6.80024V7.49977ZM7.6914 7.58633C8.09023 7.5293 8.49809 7.49977 8.91304 7.49977V6.80024C8.46486 6.80024 8.02391 6.83214 7.59239 6.89384L7.6914 7.58633Z" fill="url(#paint0_linear_1_204)" fillOpacity="0.1" mask="url(#path-1-inside-1_1_204)"/>
                <defs>
                <linearGradient id="paint0_linear_1_204" x1="8.91304" y1="-6.32499" x2="8.91304" y2="25" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                </defs>
            </svg>
            <div className="text-indigo-500 text-3xl font-bold font-quicksand">square</div>
        </div>
        <div className='order-2'>
            {menuItems.map(({ title, items }) => (
                <div key={title}>
                <div className="mx-5 mt-5 text-neutral-400 text-xs font-medium font-['Satoshi Variable'] leading-tight tracking-tight mb-4">{title}</div>
                <div className="flex flex-col gap-3">
                    {items.map(({ to, label, badgeCount, icon: Icon }) => (
                    <MenuItem
                        key={to}
                        to={to}
                        icon={Icon}
                        label={label}
                        badgeCount={badgeCount}
                    />
                    ))}
                </div>
                </div>
            ))}
        </div>
        <div className="w-full p-6 order-3 mt-auto border-t border-neutral-300/40 flex-col justify-center items-start gap-6 inline-flex">
            <div className="justify-start items-center gap-3 inline-flex">
                <img className="w-9 h-9 relative rounded-3xl" src="https://via.placeholder.com/36x36" />
                <div className="w-24 flex-col justify-start items-start inline-flex">
                <div className="text-neutral-900 text-sm font-semibold font-quicksand leading-tight">Savannah N</div>
                <div className="self-stretch text-neutral-400 text-xs font-normal font-['Satoshi'] leading-tight tracking-tight">Food Quality Manager</div>
                </div>
            </div>
            <div className="self-stretch p-2 bg-pink-50 rounded justify-center items-center gap-2 inline-flex hover:bg-neutral-400 cursor-pointer">
                <LogoutCurve size={16} variant='Bulk' color='#98949E'/>
                <div className="text-red-800 text-xs font-semibold font-quicksand leading-none">Logout</div>
            </div>
        </div>
    </div>
  );
};

export default Sidebar;
