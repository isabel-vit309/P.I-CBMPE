import type { ElementType } from 'react';
import { NavLink } from 'react-router-dom';

export interface NavItemProps {
    title: string;
    icon: ElementType;
    to: string;
}

export function NavItem({ title, icon: Icon, to }: NavItemProps) {
    return (
        <nav className='border border-zinc-100 w-[14rem]  mt-4 hover:text-white hover:bg-primary'>
        <NavLink to={to} className="flex items-center gap-3 px-3 py-2 ">
            <Icon className="w-6 h-6 hover:text-white" />
            <span className="font-roboto">{title}</span>
        </NavLink>
        </nav>
    )
}
