import React, { Dispatch, SetStateAction, useState } from 'react';
import axiosInstance, { setAccessToken } from '../../service/apiAxios';
import { User } from '../../entities/User/types/user';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { responseUser } from '../../entities/User/types/response.user';

type AuthPageProps = {
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthPage = ({ setUser }: AuthPageProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const response = await axiosInstance.post<responseUser>('/auth/authorization', {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
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
    <div className="AuthPage">
      <div className="Background d-flex justify-content-center align-items-center flex-column">
        <div className="card">
          <div className="card-body">
            <h1 className="title text-center ">Вход</h1>
            <form
              className="form d-flex flex-column align-items-center justify-content-center mx-50"
              onSubmit={onHandleSubmit}
            >
              <input
                type="text"
                className="form-control m-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                className="form-control m-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
              />
              {error && <p>{error}</p>}
              <button type="submit" className="btn btn-over">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
