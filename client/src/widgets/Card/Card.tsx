import React from 'react';
import { Hero } from '../../entities/Heroes/types/hero';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  hero: Hero;
};

const Card = ({ hero }: CardProps): JSX.Element => {
  console.log();
  const navigate = useNavigate();

  return (
    <div style={{ width: '12rem' }} onClick={() => {
      navigate(`/hero/${hero.key}`);
    }} className="card m-3 pointer">
      <img className='card-img-top' src={hero.portrait} alt={hero.name} />
      <div className="card-body">
        <h3 className="card-title text-wrap text-center">{hero.name}</h3>
        <p className='card-text text-center'>{hero.role}</p>
      </div>
    </div>
  );
};

export default Card;
