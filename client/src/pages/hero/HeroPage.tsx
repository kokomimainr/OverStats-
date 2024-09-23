import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../shared/ui/Loader/Loader';

interface HeroHitpoints {
  health: number;
  shields: number;
  armor: number;
  total: number;
}

interface AbilityVideo {
  thumbnail: string;
  link: {
    mp4: string;
    webm: string;
  };
}

interface Ability {
  name: string;
  description: string;
  icon: string;
  video: AbilityVideo;
}

interface StoryChapter {
  title: string;
  content: string;
  picture: string;
}

interface HeroStory {
  summary: string;
  media: {
    type: string;
    link: string;
  };
  chapters: StoryChapter[];
}

interface Hero {
  name: string;
  description: string;
  portrait: string;
  role: string;
  location: string;
  birthday: string;
  age: number;
  hitpoints: HeroHitpoints;
  abilities: Ability[];
  story: HeroStory;
}

type HeroPageProps = {};

const HeroPage = ({}: HeroPageProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<Hero | null>(null);
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const { hero } = useParams();

  const getOneHero = async () => {
    try {
      const response = await axios.get(
        `https://overfast-api.tekrop.fr/heroes/${hero}?locale=ru-ru`,
      );
      if (response.status === 200) {
        setHeroData(response.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setError(axiosError.message);
      } else {
        setError('Some error');
      }
    }
  };

  useEffect(() => {
    getOneHero();
  }, []);

  const toggleChapter = (index: number) => {
    setActiveChapter(activeChapter === index ? null : index);
  };

  return (
    <div className="HeroPage">
      {heroData ? (
        <>
          <div className="heroBGc ">
            <div className="d-flex justify-content-evenly align-items-center ">
              <div className="main d-flex flex-column justify-content-center align-items-center ">
                <div
                  className="portrait d-flex justify-content-center align-items-center mt-5"
                  style={{
                    border: '5px solid',
                    backgroundColor: '#fff',
                    display: 'inline-block',
                    borderRadius: '8px',
                  }}
                >
                  <img
                    src={heroData.portrait}
                    alt={heroData.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <p className="role text-center fs-2">{heroData.role}</p>
              </div>
              <div className="other-data w-50">
                <h1 className="text-center fs-10">{heroData.name}</h1>
                <p className="text-center fs-4">Описание: {heroData.description}</p>
                <p className="text-center fs-4">Местонахождение: {heroData.location}</p>
                <div className="d-flex justify-content-evenly">
                  <p className="text-center fs-4">День рождения: {heroData.birthday}</p>
                  <p className="text-center fs-4">Возраст: {heroData.age}</p>
                </div>
              </div>
            </div>
            <br />
          </div>

          <div className="heroes-BGC p-5">
            <div className="sum w-50 mx-auto">
              <h1 className="text-center fs-20 text-white">История героя</h1>
              <p className="text-center text-white">{heroData.story.summary}</p>
              <iframe
                className="w-100"
                width="720"
                height="400"
                src="https://youtu.be/WeKUX6a5Nws"
              ></iframe>
            </div>
            <h1 className="text-center fs-20 text-white mt-5">История</h1>
            <div className="d-flex justify-content-center align-items-center">
              <div className="chapters-buttons w-25 d-flex flex-column justify-content-center align-items-center mt-5">
                {heroData.story.chapters.map((chapter, index) => (
                  <p key={index}>
                    <button className="btn mb-2" onClick={() => toggleChapter(index)}>
                      {chapter.title}
                    </button>
                  </p>
                ))}
              </div>
              <div className="chapter-content w-50 d-flex justify-content-center align-items-center mt-5">
                {activeChapter !== null && (
                  <div className="card card-body text-center d-flex">
                    <h5 className="card-title text-center fs-20">
                      {heroData.story.chapters[activeChapter].title}
                    </h5>
                    <p className="card-text">{heroData.story.chapters[activeChapter].content}</p>
                    <img
                      src={heroData.story.chapters[activeChapter].picture}
                      alt=""
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-center fs-20 text-white">Способности</h1>
            <div className="ability d-flex justify-content-evenly">
              {heroData.abilities.map((ability, index) => (
                <div className="card mt-5" style={{ width: '18rem' }} key={index}>
                  <video
                    src={ability.video.link.mp4}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: 'auto' }}
                  ></video>
                  <div className="card-body">
                    <h5 className="card-title text-center fs-2">{ability.name}</h5>
                    <p className="card-text">{ability.description}</p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-50">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default HeroPage;
