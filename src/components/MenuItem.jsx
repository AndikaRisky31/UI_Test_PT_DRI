import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ to, label, badgeCount = 0, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `w-full py-2 flex items-center gap-3 rounded px-5 ${
          isActive ? 'bg-indigo-100' : ''
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size="14" color={isActive ? '#5E70D2' : '#98949E'} variant="TwoTone"/>
          <div className={`grow text-sm font-bold font-quicksand leading-tight ${
            isActive ? 'text-indigo-500' : 'text-neutral-400'
          }`}>
            {label}
          </div>
          {badgeCount > 0 && (
            <div className="h-5 w-5 aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex justify-center items-center">
              <div className="text-center text-white text-xs font-semibold font-quicksand leading-none">
                {badgeCount}
              </div>
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;
