
import React from 'react';
import { Page } from '../types';
import ThemeToggle from './ThemeToggle';
import { DashboardIcon, QuizIcon, AboutIcon, AuthorIcon } from './icons/NavIcons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const NavItem: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, currentPage, setCurrentPage, icon, label }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center w-full px-4 py-3 transition-all duration-300 ease-in-out group ${
        isActive
          ? 'bg-cyan-500/10 text-cyan-400'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-100'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>{icon}</div>
      <span className="ml-4 text-sm font-medium opacity-0 md:opacity-100 transition-opacity duration-200">{label}</span>
    </button>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, theme, toggleTheme }) => {
    return (
        <aside className="fixed top-0 left-0 h-full w-16 md:w-64 bg-gray-900 dark:bg-black/50 backdrop-blur-sm border-r border-gray-700/50 z-30 flex flex-col transition-all duration-300">
            <div className="flex items-center justify-center md:justify-start h-20 px-4 md:px-6 border-b border-gray-700/50">
                <svg width="32" height="32" viewBox="0 0 24 24" className="text-cyan-400">
                    <path fill="currentColor" d="M12 2L1 21h22L12 2zm-1.09 17L12 15.6l1.09 3.4H10.91zm1.09-5.1L12 12.5l1.09 1.4L12 15.3l-1.09-1.4zM12 4.4l4.5 9.8-1.55 1.7L12 11.5l-2.95 4.4-1.55-1.7L12 4.4z"></path>
                </svg>
                <h1 className="ml-3 text-lg font-bold text-gray-100 hidden md:block">NEUTRINOM GATE</h1>
            </div>
            <nav className="flex-1 mt-4 space-y-2">
                <NavItem page={Page.Dashboard} currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<DashboardIcon />} label="Dashboard" />
                <NavItem page={Page.Quiz} currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<QuizIcon />} label="Start Quiz" />
                <NavItem page={Page.AboutNeutrinom} currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<AboutIcon />} label="About NEUTRINOM" />
                <NavItem page={Page.AboutAuthor} currentPage={currentPage} setCurrentPage={setCurrentPage} icon={<AuthorIcon />} label="About the Author" />
            </nav>
            <div className="p-4 border-t border-gray-700/50">
                <div className="flex items-center justify-center md:justify-between">
                    <p className="hidden md:block text-xs text-gray-500">Theme</p>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
