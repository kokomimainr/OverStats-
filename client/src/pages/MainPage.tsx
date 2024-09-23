import React from 'react';
import Card from '../widgets/Card/Card';
import { Hero } from '../entities/Heroes/types/hero';
import { useNavigate } from 'react-router-dom';

type MainPageProps = {};

const MainPage = ({}: MainPageProps): JSX.Element => {
  const navigate = useNavigate();
  // console.log(heroes);
  return (
    <>
      <div className="Main d-flex flex-column">
        <h1 className="title w-50 text-center fs-20 m-15">
          БУДУЩЕЕ, ЗА КОТОРОЕ СТОИТ БОРОТЬСЯ! Присоединяйтесь к OverStats — вашему бесплатному
          ресурсу для статистики и героев Overwatch!
        </h1>
        <button className="btn btn-over" onClick={() => navigate('/reg')}>
          Присоединяйтесь
        </button>
      </div>
      <div className="HeroesMain d-flex align-items-center justify-content-center flex-column">
        <br />
        <h1 className="title w-50 text-center text-white">УЖЕ В ИГРЕ</h1>
        <p className="fs-15 text-center w-35 text-white">
          СРАЖАЙТЕСЬ ПЛЕЧОМ К ПЛЕЧУ С ДРУГИМИ ГЕРОЯМИ
        </p>
        <blockquote className="w-50 text-center text-white fs-4">
          Позовите друзей, соберите команду и познакомьтесь со всеми возможностями Overwatch 2.
        </blockquote>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    {[
      { src: "/Damage.avif", title: "Урон", description: "Герои этой категории призваны находить противников, навязывать им бой и устранять их. Способны нанести серьезный ущерб, но уязвимы." },
      { src: "/Tank.png", title: "Танк", description: "Герои, способные выдержать много урона, защищают команду, принимая на себя атаки противника." },
      { src: "/Support.avif", title: "Поддержка", description: "Герои усиливают союзников, исцеляют и укрывают их щитами, помогают команде выживать." }
    ].map((item, index) => (
      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
        <div className="d-flex w-100 justify-content-evenly align-items-center">
          <img style={{ width: '25rem' }} src={item.src} className="d-block" alt={item.title} />
          <div className="d-flex w-25 justify-content-evenly align-items-center flex-column">
            <p className="fs-15 text-center text-white">{item.title}</p>
            <p className="fs-5 text-center text-white">{item.description}</p>
            <button className="btn btn-over" onClick={() => navigate('/heroes')}>Узнать больше</button>
          </div>
        </div>
      </div>
    ))}
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      </div>
    </>
  );
};

export default MainPage;
