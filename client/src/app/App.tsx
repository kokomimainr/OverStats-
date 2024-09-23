import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import AppRouters from './provider/AppRouters';
import { Hero } from '../entities/Heroes/types/hero';
import { User } from '../entities/User/types/user';
import NavBar from '../widgets/Navbar/NavBar';
import axiosInstance, { setAccessToken } from '../service/apiAxios';
import './App.css';
import Footer from '../widgets/Footer/Footer';

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState<string | null>(null);
  const getAllHeroes = async () => {
    try {
      const response: AxiosResponse<Hero[]> = await axios.get(
        'https://overfast-api.tekrop.fr/heroes?locale=ru-ru',
      );
      console.log(response.data);
      setHeroes(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      // setError(message.response.data.message);
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message)
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  const refreshUser = async () => {
    try {
      const response = await axiosInstance.get('/tokens/refresh');

      if (response.status === 200) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // setError(message.response.data.message);
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message)
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  }
  useEffect(() => {
    getAllHeroes();
    refreshUser();
  }, []);

  // console.log(user);
  
  
  return (
    <>
    <NavBar setUser={setUser} user={user}/>
      <AppRouters setUser={setUser} heroes={heroes} />
      <Footer/>
    </>
  );
}

export default App;
