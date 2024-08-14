import React from 'react';
import { Link} from 'react-router-dom';

const MenuItem = ({ to, label, badgeCount = 0, isActive = false, icon: Icon }) => {
  
  return (
    <Link
      to={to}
      className={`w-full py-2 flex items-center gap-3 rounded`}
    >
      <Icon size="14" color={isActive ? '#5E70D2' : '#98949E'} variant="TwoTone"/>
      <div className={`grow text-sm font-bold font-['Quicksand'] leading-tight ${isActive ? 'text-indigo-500' : 'text-neutral-400'}`}>
        {label}
      </div>
      {badgeCount > 0 && (
        <div className="h-5 w-5 aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex justify-center items-center">
        <div className="text-center text-white text-xs font-semibold font-['Quicksand'] leading-none">
          {badgeCount}
        </div>
      </div>
      
      )}
    </Link>
  );
};

export default MenuItem;
