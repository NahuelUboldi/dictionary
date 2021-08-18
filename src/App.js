import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, withStyles, Switch } from '@material-ui/core';
import Header from './components/header/header.js';
import Definitions from './components/definitions/Definitions';
import { grey } from '@material-ui/core/colors';
function App() {
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('en');
  const [lightMode, setLightMode] = useState(false);
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      '&$checked': {
        color: grey[500],
      },
      '&$checked + $track': {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );

      setMeanings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
  }, [word, category]);
  return (
    <div
      className='App'
      style={{
        height: '100vh',
        backgroundColor: lightMode ? '#eee' : '#282c34',
        color: lightMode ? 'black' : 'white',
        justifyContent: 'space-evenly',
        transition: 'all 0.5s linear',
      }}
    >
      <Container
        maxWidth='md'
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <div className='light-mode-container'>
          <span>{lightMode ? 'Dark' : 'Light'} Mode</span>
          <DarkMode
            checked={lightMode}
            onChange={() => setLightMode(!lightMode)}
          />
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} />
        )}
      </Container>
    </div>
  );
}

export default App;
