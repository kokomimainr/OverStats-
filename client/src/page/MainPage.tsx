import React from 'react';
import Card from '../widgets/Card/Card';

type MainPageProps = {
  heroes: any;
};

const MainPage = ({ heroes }: MainPageProps): JSX.Element => {
  return <>{heroes && heroes.map((hero) => <Card key={hero.id} hero={hero} />)}</>;
};

export default MainPage;
