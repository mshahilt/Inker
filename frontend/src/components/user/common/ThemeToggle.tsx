import { useState, useEffect } from 'react';
import { useTheme } from './theme-provider';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const handleToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <label
      className={`relative inline-flex items-center cursor-pointer select-none ${className}`}
      aria-label="Toggle theme"
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isDark}
        onChange={handleToggle}
        aria-hidden="true"
      />
      <div
        className="
          w-12 h-6 bg-gray-200 dark:bg-gray-600 
          rounded-full peer peer-checked:bg-gray-800 
          transition-colors duration-300 ease-in-out
          relative
          after:content-[''] 
          after:absolute 
          after:top-[2px] 
          after:left-[2px] 
          after:w-5 
          after:h-5 
          after:bg-white 
          after:rounded-full 
          after:shadow-md 
          after:transition-all 
          after:duration-300 
          peer-checked:after:translate-x-6 
          peer-checked:after:bg-yellow-300
        "
      >
        <div
          className="
            absolute 
            inset-0 
            flex 
            items-center 
            justify-between 
            px-1
            pointer-events-none
          "
        >
          <svg
            className={`
              w-3.5 h-3.5 
              text-yellow-500 
              transition-opacity 
              duration-300
              ${isDark ? 'opacity-0' : 'opacity-100'}
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
          <svg
            className={`
              w-3.5 h-3.5 
              text-gray-300 
              transition-opacity 
              duration-300
              ${isDark ? 'opacity-100' : 'opacity-0'}
            `}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>
    </label>
  );
};

export default ThemeToggle;