import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import MainPage from './page/MainPage';

function App(): JSX.Element {
  const [heroes, setHeroes] = useState([]);
  const getAllHeroes = async () => {
    try {
      const response = await axios.get('https://overfast-api.tekrop.fr/heroes?locale=ru-ru')
      setHeroes(response.data)
    } catch ({response}) {
      console.log(response)
    }
  }
  useEffect(() => {
    getAllHeroes()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage heroes={heroes}/>} />
      </Routes>
    </>
  );
}

export default App;
