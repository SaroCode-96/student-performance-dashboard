import React from 'react';
import { NavLink } from 'react-router-dom';
import { View } from '../types';
import DashboardIcon from './icons/DashboardIcon';
import StudentsIcon from './icons/StudentsIcon';
import SubjectsIcon from './icons/SubjectsIcon';

interface SidebarProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const navItems = [
    { view: View.Dashboard, icon: DashboardIcon, path: '/' },
    { view: View.Students, icon: StudentsIcon, path: '/students' },
    { view: View.Subjects, icon: SubjectsIcon, path: '/subjects' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpen }) => {
    
    const NavItem: React.FC<{item: {view: View, icon: React.FC<React.SVGProps<SVGSVGElement>>, path: string}}> = ({ item }) => {
        const Icon = item.icon;

        return (
            <li className="mb-2">
                <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `flex items-center p-3 rounded-lg transition-all duration-200 ${
                        isActive 
                        ? 'bg-accent text-white shadow-lg' 
                        : 'text-gray-400 hover:bg-secondary-dark hover:text-white'
                    }`}
                >
                    <Icon className="h-6 w-6 mr-4" />
                    <span className="font-medium">{item.view}</span>
                </NavLink>
            </li>
        );
    }
    
    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
            <aside className={`absolute lg:relative w-64 h-full bg-primary-dark text-white p-4 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="flex items-center mb-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-academic-blue to-accent flex items-center justify-center mr-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21.75l4.5-4.5-4.5-4.5" />
                        </svg>
                    </div>
                    <span className="text-2xl font-semibold">EduDash</span>
                </div>
                <nav>
                    <ul>
                        {navItems.map(item => <NavItem key={item.view} item={item} />)}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;