import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../../entities/User/types/user';
import axios, { AxiosError } from 'axios';
import axiosInstance, { setAccessToken } from '../../service/apiAxios';
import { useNavigate } from 'react-router-dom';
import { responseUser } from '../../entities/User/types/response.user';

type RegPageProps = {
  setUser: Dispatch<SetStateAction<User | null>>;
};

const RegPage = ({ setUser }: RegPageProps): JSX.Element => {
  const [name, setName] = useState<User['name']>('');
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validation = (): boolean => {
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return false;
    }
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      setError('Некорректная почта');
      return false;
    }
    if(!name.match(/^[a-zA-Zа-яА-Я]+$/)) {
      setError('Некорректное имя');
      return false;
    }
    return true;
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      if (!validation()) {
        return;
      }
      const response = await axiosInstance.post<responseUser>('/auth/reg', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 201) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      // setError(message.response.data.message);
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };
  return (
    <div className="RegPage">
       <div className="Background d-flex justify-content-center align-items-center flex-column">
       <div className="card">
       <div className="card-body">
       <h1 className='text-center'>Регистрация</h1>
       <form className="d-flex flex-column" onSubmit={onHandleSubmit}>
        <input
          className="form-control m-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />
        <input
          className="form-control m-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="form-control m-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <input
          className="form-control m-2"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Подтвердите пароль"
        />
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className='btn btn-over'>Зарегистрироваться</button>
      </form>
       </div>
       </div>
       </div>
     
      
    </div>
  );
};

export default RegPage;
