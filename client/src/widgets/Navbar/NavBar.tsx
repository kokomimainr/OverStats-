import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { User } from '../../entities/User/types/user';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../service/apiAxios';
import axios, { AxiosError } from 'axios';

type NavBarProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const NavBar = ({ user, setUser }: NavBarProps): JSX.Element => {
  const emojis = [
    '(❁´◡`❁)',
    '( ✿◠‿◠ )',
    '（＞人＜；）',
    '( •̀ ω •́ )',
    '（〃｀ 3′〃）',
    '╰(*°▽°*)╯',
    '(≧∇≦)ﾉ',
  ];
  const [emoji, setEmoji] = useState<string>('');
  const navigate = useNavigate();

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  };

  const onHandleLogout = async () => {
    try {
      const response = await axiosInstance.delete('/auth/logout');
      if (response.status === 200) {
        setUser(null);
        setAccessToken('');
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  useEffect(() => {
    setEmoji(getRandomEmoji());
  }, [user]);

  return (
    <div className="NavBar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand fs-1 pointer" onClick={() => navigate('/')}>
            <img src="/OverStats.png" className="mx-3" alt="Logo" width="48" height="48" />
            OverStats
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to="/"
                >
                  На главную
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to="/stats"
                >
                  Статистика игрока
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  to="/heroes"
                >
                  Герои
                </NavLink>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                      to="/reg"
                    >
                      Регистрация
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                      to="/auth"
                    >
                      Авторизация
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                      to="/favorites"
                    >
                      Избранное
                    </NavLink>
                  </li>
                  <li className="nav-item nav-link pointer" onClick={onHandleLogout}>
                    Выйти
                  </li>
                </>
              )}
            </ul>
            {user && (
              <span className="navbar-text fs-3">
                Добрый день, {user.name} ! {emoji}
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
