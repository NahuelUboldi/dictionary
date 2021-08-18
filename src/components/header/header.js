import React from 'react';
import './header.css';
import {
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import categories from '../../data/category';
const header = ({ category, setCategory, word, setWord, lightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: lightMode ? '#000' : '#fff',
      },
      type: lightMode ? 'light' : 'dark',
    },
  });
  const handleChange = (lang) => {
    setCategory(lang);
    setWord('');
  };

  return (
    <header className='header'>
      <span className='title'>{word ? word : 'Dictionary'}</span>
      <div className='inputs'>
        <ThemeProvider theme={darkTheme}>
          <TextField
            className='search'
            label='Search a Word'
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <TextField
            className='select'
            select
            label='Language'
            value={category}
            onChange={(e) => handleChange(e.target.value)}
          >
            {categories.map((option) => {
              return (
                <MenuItem key={option.label} value={option.label}>
                  {option.value}
                </MenuItem>
              );
            })}
          </TextField>
        </ThemeProvider>
      </div>
    </header>
  );
};

export default header;
