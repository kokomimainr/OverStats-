import React from 'react';

type CardProps = {
    hero: any
}

const Card = ({hero}: CardProps): JSX.Element => {
  return (
    <div className='Card'>
      <h3>{hero.name}</h3>
      <img src={hero.portrait} alt={hero.name}/>
      <p>{hero.role}</p>
    </div>
  );
};

export default Card;
