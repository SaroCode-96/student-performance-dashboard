
import React from 'react';
import { Theme } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import MenuIcon from './icons/MenuIcon';

interface HeaderProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, toggleSidebar }) => {
    const toggleTheme = () => {
        setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    };

    return (
        <header className="flex items-center justify-between p-4 bg-primary-light dark:bg-secondary-dark shadow-md z-10 transition-colors duration-300">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 mr-4 lg:hidden">
                    <MenuIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-academic-blue">
                    Student Performance Dashboard
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                    {theme === Theme.Light ? <MoonIcon className="h-6 w-6 text-gray-700" /> : <SunIcon className="h-6 w-6 text-yellow-400" />}
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-academic-blue to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
