import { createContext, useContext, useEffect, useState } from 'react';
import storage from '../utils/storage';

const AppThemeContext = createContext({
  theme: 'light',
  themeToggle: () => {},
});

const KEY_THEME_NAME = 'theme';

export const AppThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const setMode = (mode) => {
    storage.setItem(KEY_THEME_NAME, mode);
    setTheme(mode);
  };

  const themeToggle = () => {
    setMode(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const deviceTheme =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = storage.getItem(KEY_THEME_NAME);
    if (localTheme) {
      setMode(localTheme);
    } else {
      setMode(deviceTheme ? 'light' : 'light');
    }
  }, []);

  return (
    <AppThemeContext.Provider
      value={{
        theme,
        themeToggle,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(AppThemeContext);
