import { Route, Routes } from 'react-router-dom';
import React, { Dispatch, lazy, SetStateAction, Suspense } from 'react';
import { Hero } from '../../entities/Heroes/types/hero';
import { User } from '../../entities/User/types/user';
import Loader from '../../shared/ui/Loader/Loader';
const MainPage = lazy(() => import('../../pages/MainPage'));
const RegPage = lazy(() => import('../../pages/auth/RegPage'));
const AuthPage = lazy(() => import('../../pages/auth/AuthPage'));
const HeroesPage = lazy(() => import('../../pages/hero/HeroesPage'));
const StatsPage = lazy(() => import('../../pages/hero/StatsPage'));
const FavPage = lazy(() => import('../../pages/hero/FavPage'));
const HeroPage = lazy(() => import('../../pages/hero/HeroPage'));

type AppRoutersProps = {
  heroes: Hero[];
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AppRouters = ({heroes, setUser }: AppRoutersProps): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/heroes" element={<HeroesPage heroes={heroes} />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="/hero/:hero" element={<HeroPage />} />
        <Route path="/reg" element={<RegPage setUser={setUser} />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouters;
