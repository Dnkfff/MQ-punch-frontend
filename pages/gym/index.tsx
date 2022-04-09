import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoxersAPI from '../../api/boxers/boxers';

// components
import BoxerPreview from '../../components/page-components/gym/BoxerPreview/BoxerPreview';
import TrainingSection from '../../components/page-components/gym/TrainingSection/TrainingSection';
import SliderComponent from '../../components/UI/Slider/Slider';
import { getUUID } from '../../inside-services/get-uuid/get-uuid';
import { Boxer, BoxerWeightClass } from '../../inside-services/types/boxers';

type GetBoxerFn = (trainingInProgress?: boolean) => Boxer;

const getMockBoxer: GetBoxerFn = (trainingInProgress = false) => {
  const boxerId = getUUID();
  return {
    id: boxerId,
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
    trainingState: {
      nextTrainings: {
        AGILITY: {
          nextTrainingInfo: {
            price: 10,
            boost: 10,
          },
          isMaxed: false,
        },
        STAMINA: {
          nextTrainingInfo: {
            price: 10,
            boost: 10,
          },
          isMaxed: false,
        },
        STRENGTH: {
          nextTrainingInfo: {
            price: 10,
            boost: 10,
          },
          isMaxed: true,
        },
      },
      isInProgress: trainingInProgress,
      trainingDuration: 100000,
      activeTraining: {
        id: getUUID(),
        price: 10,
        amountGained: 20,
        type: 'STAMINA',
        status: 'IN_PROGRESS',
        startedAt: Date.now(),
        boxerId,
      },
    },
  };
};


const baseUrl = 'https://reqres.in/api/products/';

const Gym = (props) => {
  // TODO: redux typing
  const userId = useSelector((state: any) => state.auth.user?.id);

  const [boxers, setBoxers] = useState<Boxer[]>([]);

  const [activeBoxer, setActiveBoxer] = useState<Boxer>(null);

  const handleSlide = (_currentIndex: number, nextIndex: number) => {
    if (boxers[nextIndex]) setActiveBoxer(boxers[nextIndex]);
  };

  const updateBoxers = async () => {
    // if (!userId) return;
    // const response = await BoxersAPI.getBoxersByUserId({ userId });
    // TODO: connect real boxers
    const boxers = [getMockBoxer(), getMockBoxer(true)];
    boxers[0].trainingState.nextTrainings.AGILITY.nextTrainingInfo.boost = 99;
    boxers[0].trainingState.nextTrainings.AGILITY.nextTrainingInfo.price = 99;
    setBoxers(boxers);
    const lastActiveBoxerId = activeBoxer?.id;
    // in case length of boxers gets changed while refetching remember last id
    const lastBoxer = boxers.find((boxer) => boxer.id === lastActiveBoxerId);
    console.log(lastBoxer, boxers[0]);
    setActiveBoxer(lastBoxer || boxers[0]);
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
      {activeBoxer && (
        <TrainingSection
          boxerId={activeBoxer.id}
          trainingState={activeBoxer.trainingState}
          refetch={updateBoxers}
        />
      )}
    </div>
  );
};

export default Gym;
