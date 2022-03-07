import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoxersAPI from '../../api/boxers/boxers';

// components
import BoxerPreview from '../../components/page-components/gym/BoxerPreview/BoxerPreview';
import TrainingSection from '../../components/page-components/gym/TrainingSection/TrainingSection';
import SliderComponent from '../../components/UI/Slider/Slider';
import { getUUID } from '../../inside-services/get-uuid/get-uuid';
import { Boxer, BoxerWeightClass } from '../../inside-services/types/boxers';

const getMockBoxer: () => Boxer = () => ({
  id: getUUID(),
  name: 'Mike Tyson',
  modelLink: './',
  numberOfFights: 10,
  numberOfWins: 7,
  points: 5000,
  weightClass: BoxerWeightClass.HEAVYWEIGHT,
  stats: {
    strength: 20,
    stamina: 11,
    agility: 13,
  },
  statsId: getUUID(),
  ownerId: getUUID(),
  logo: './',
  trainingInfo: {
    nextTraining: {
      AGILITY: {
        boost: 2,
        isMaxed: false,
        trainingDuration: 2,
        trainingPrice: 2,
      },
      STAMINA: {
        boost: 2,
        isMaxed: false,
        trainingDuration: 2,
        trainingPrice: 2,
      },
      STRENGTH: {
        boost: 2,
        isMaxed: false,
        trainingDuration: 2,
        trainingPrice: 2,
      },
    },
    isInProgress: false,
    trainingFinishesAt: null,
  },
});

const Gym = (props) => {
  // TODO: redux typing
  const userId = useSelector((state: any) => state.auth.user?.id);

  const [boxers, setBoxers] = useState<Boxer[]>([]);

  const [activeBoxer, setActiveBoxer] = useState<Boxer>(null);

  const handleSlide = (_currentIndex: number, nextIndex: number) => {
    if (boxers[nextIndex]) setActiveBoxer(boxers[nextIndex]);
  };

  const updateBoxers = async () => {
    if (!userId) return;
    // const response = await BoxersAPI.getBoxersByUserId({ userId });
    // TODO: connect real boxers
    const [boxer1, boxer2] = [getMockBoxer(), getMockBoxer()];
    setBoxers([boxer1, boxer2]);
    setActiveBoxer(boxer1);
    // setBoxers(response.data.boxers || []);
    // setActiveBoxer(response.data.boxers?.[0]);
  };

  useEffect(() => {
    updateBoxers();
  }, [userId]);

  return (
    <div>
      <h1>
        Training center
        <br />
        You need to train your boxer to improve some stats
      </h1>
      <SliderComponent onChange={handleSlide}>
        {boxers.map((boxer) => {
          return <BoxerPreview key={boxer.id} boxer={boxer} />;
        })}
      </SliderComponent>
      {activeBoxer && <TrainingSection trainingInfo={activeBoxer.trainingInfo} />}
    </div>
  );
};

export default Gym;
