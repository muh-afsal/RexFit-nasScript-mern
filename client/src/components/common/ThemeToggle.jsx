import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className="flex items-center space-x-2 mr-[-10px] md:mr-3">
      <button
        onClick={toggleTheme}
        className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 focus:outline-none"
      >
        {isDark ? (
          <div className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out">
            <MoonIcon size={23} className="text-white" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out">
            <SunIcon size={22} className="text-neutral-600" />
          </div>
        )}
      </button>
    </div>
  );
}