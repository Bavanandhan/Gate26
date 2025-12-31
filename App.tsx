
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import QuizSetup from './pages/QuizSetup';
import AboutNeutrinom from './pages/AboutNeutrinom';
import AboutAuthor from './pages/AboutAuthor';
import ParticleBackground from './components/ParticleBackground';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [theme, setTheme] = useState<'dark' | 'light'>(localStorage.getItem('theme') as 'dark' | 'light' || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900');
      document.body.classList.remove('bg-gray-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
      document.body.classList.add('bg-gray-100');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard />;
      case Page.Quiz:
        return <QuizSetup />;
      case Page.AboutNeutrinom:
        return <AboutNeutrinom />;
      case Page.AboutAuthor:
        return <AboutAuthor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <ParticleBackground />
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-16 md:ml-64 relative z-10 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
