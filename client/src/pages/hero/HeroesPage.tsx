import React, { useState } from 'react';
import Card from '../../widgets/Card/Card';

type Hero = {
  key: string;
  name: string;
  portrait: string;
  role: string;
};

type HeroesPageProps = {
  heroes: Hero[];
}

const HeroesPage = ({ heroes }: HeroesPageProps): JSX.Element => {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Фильтрация героев по выбранной роли
  const filteredHeroes = selectedRole === 'all'
    ? heroes
    : heroes.filter((hero) => hero.role.toLowerCase() === selectedRole);

  return (
    <div className='HeroesPage'>
      <div className="header-BGC">
        <h1 className='title text-center fs-10 m-15'>Герои</h1>
      </div>
      <div className="heroes-BGC">
        <br />
        <div className="heroes">
          <h2 className="w-50 mt-3 mx-auto text-center text-white">
            В Overwatch вы найдете множество ярких героев из разных стран, у каждого из которых есть
            своя история. Познакомьтесь с героями Overwatch!
          </h2>
          {/* Кнопки для фильтрации */}
          <div className="text-center my-3">
            <button className="btn btn-over mx-2" onClick={() => setSelectedRole('all')}>
              Все
            </button>
            <button className="btn btn-over mx-2" onClick={() => setSelectedRole('tank')}>
              Танк
            </button>
            <button className="btn btn-over mx-2" onClick={() => setSelectedRole('damage')}>
              Урон
            </button>
            <button className="btn btn-over mx-2" onClick={() => setSelectedRole('support')}>
              Поддержка
            </button>
          </div>
          {/* Отображение отфильтрованных героев */}
          <div className="mx-50 d-flex flex-wrap justify-content-evenly">
            {filteredHeroes.length > 0 ? (
              filteredHeroes.map((hero: Hero) => <Card key={hero.key} hero={hero} />)
            ) : (
              <p className="text-center text-white">Героев не найдено</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroesPage;