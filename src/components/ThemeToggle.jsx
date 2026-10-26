import { createContext, useContext } from 'react';

export const ThemeContext = createContext(null);

export function ThemeToggle({ className }) {
  const { theme, toggle } = useContext(ThemeContext);
  const next = theme === 'dark' ? 'Light' : 'Dark';
  return (
    <button type="button" className={className} onClick={toggle}
      aria-label={`Switch to ${next.toLowerCase()} mode`} title={`Switch to ${next.toLowerCase()} mode`}>
      <span className="theme-label">{next} ◐</span>
    </button>
  );
}
