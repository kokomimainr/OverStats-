import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TotalStats {
  eliminations: number;
  assists: number;
  deaths: number;
  damage: number;
  healing: number;
}

interface AverageStats {
  eliminations: number;
  assists: number;
  deaths: number;
  damage: number;
  healing: number;
}

interface RoleStats {
  games_played: number;
  games_won: number;
  games_lost: number;
  time_played: number;
  winrate: number;
  kda: number;
  total: TotalStats;
  average: AverageStats;
}

interface HeroStats extends RoleStats {}

interface PlayerStats {
  general: RoleStats;
  heroes: {
    [heroName: string]: HeroStats;
  };
}

const StatsPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<PlayerStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'games_played' | 'time_played'>('games_played');

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://overfast-api.tekrop.fr/players/${name}-${id}/stats/summary?locale=ru-ru`,
      );
      if (response.status === 200) {
        setData(response.data);
        setError(null);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      } else {
        setError('Some error occurred');
      }
    }
  };

  const getTopHeroesByFilter = () => {
    if (!data) return [];
    return Object.entries(data.heroes)
      .sort(([, a], [, b]) => b[filter] - a[filter])
      .slice(0, 5)
      .map(([name, stats]) => ({
        name,
        gamesPlayed: stats.games_played,
        timePlayed: stats.time_played,
      }));
  };

  const FilterButtons = () => (
    <div className="text-center">
      <button className="btn btn-over m-2" onClick={() => setFilter('games_played')}>
        Игр сыграно
      </button>
      <button className="btn btn-over m-2" onClick={() => setFilter('time_played')}>
        По времени
      </button>
    </div>
  );

  const StatsChart = () => {
    const topHeroes = getTopHeroesByFilter();

    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={topHeroes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gamesPlayed" fill="#8884d8" />
          <Bar dataKey="timePlayed" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="statsBGC">
      <h1 className="title text-center">Статистика</h1>
      <form onSubmit={onHandleSubmit} className="form d-flex flex-column align-items-center">
        <div className="d-flex">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mx-2"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button type="submit" className="m-4 btn btn-over">
          Поиск
        </button>
      </form>

      {error && <p>{error}</p>}

      {data && (
        <>
          <div className="d-flex justify-content-between align-items-center text-center w-80">
            <div className="text-center w-50">
              <h1>Игр сыграно: {data.general.games_played}</h1>
              <h1>Игр выиграно: {data.general.games_won}</h1>
              <h1>Игр проиграно: {data.general.games_lost}</h1>
              <h1>KDA: {data.general.kda}</h1>
              <h1>Процент выигрыша: {data.general.winrate}</h1>
              <h1>Милисекунд в игре: {data.general.time_played}</h1>
              <h1>Убийств: {data.general.total.eliminations}</h1>
            </div>
            <div className="stats w-50">
              <FilterButtons />
              <StatsChart />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;
