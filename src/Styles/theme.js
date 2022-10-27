const colorsLight = {
  primary: '#127dff',
  secondary: '#6da9ff',
  white: '#fff',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  black: '#000',
  paginationNav: '#eeeeee',
  bgCard: '#f5f5f5',
  transparent: 'transparent',
  background: '#FFF',
  backgroundInput: '#127dff',
  textModal: '#000000',
  buttonText: '#ffffff',
  placeholder: '#767676',
  inputText: '#000000',
  inputBorder: '#000000',
  container: 'rgba(186,186,186,0.5)',
  shadow: 'rgba(2, 1, 1, 0.1)',
  text: '#000000',
  nav: 'rgba(228,223,223,0.7)',
  input: '#F5F5F5',
  shadowInput: 'rgb(224, 224, 224)',
  optionHover: '#f5f5f5',
};

const colorsDark = {
  ...colorsLight,
  primary: '#8853fe',
  secondary: '#af93ff',
  paginationNav: '#232323',
  background: '#000000',
  bgCard: '#1d1d1d',
  inputText: '#000000',
  backgroundInput: '#ffffff',
  text: '#ffffff',
  inputBorder: '#8853fe',
  container: 'rgba(21,21,21,0.5)',
  nav: 'rgba(21,21,21,0.5)',
  input: '#161616',
  shadowInput: 'rgb(207,207,207)',
  optionHover: '#1d1d1d',
};

const zIndex = {
  min: -1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  max: 10,
  nav: 20,
  modal: 30,
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '1920px',
  desktopL: '2560px',
};

export const themeLight = {
  colors: colorsLight,
  zIndex,
  size,
};

export const themeDark = {
  ...themeLight,
  colors: colorsDark,
  zIndex,
  size,
};
