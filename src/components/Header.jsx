import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="grid  grid-cols-1 md:grid-cols-2 border-b-2 border-neutral-300/40">
            <div className='index-1'>
                <div className=" text-black text-2xl font-bold font-quicksand leading-9">
                    Customer
                </div>
                <div className="py-3 text-neutral-400 text-sm font-medium font-['Satoshi Variable'] leading-7 tracking-tight">
                    You can manage and organize your customer and other things here
                </div>
            </div>
            <div className="mt-auto w-full row-span-2 items-end  gap-2 inline-flex">
                <CustomNavLink to="/customer" exact>
                    Customer
                </CustomNavLink>
                <CustomNavLink to="/customer/promo">
                    Promo
                </CustomNavLink>
                <CustomNavLink to="/customer/voucher">
                    Voucher
                </CustomNavLink>
            </div>
        </div>
    );
};

const CustomNavLink = ({ to, children, exact = false }) => (
    <NavLink
        to={to}
        end={exact}
        className={({ isActive }) =>
            `grow h-11 py-3 text-center text-sm font-bold font-quicksand leading-tight ${
                isActive ? 'border-b-2 border-indigo-500 text-indigo-500 font-bold scale-[110%]' : 'text-neutral-400 font-semibold'
            }`
        }
    >
        {children}
    </NavLink>
);

export default Header;