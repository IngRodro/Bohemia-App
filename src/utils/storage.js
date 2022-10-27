const storage = {
  getItem: (key) => {
    const value = window.localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  setItem: (key, value) => {
    const newValue = typeof value === 'object' ? JSON.stringify(value) : value;
    window.localStorage.setItem(key, newValue);
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
  },
};

export default storage;
