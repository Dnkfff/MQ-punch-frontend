import { getUUID } from '../../inside-services/get-uuid/get-uuid';

// assets
import WoodDivisionIcon from '../../assets/website/division_icons/dummy/wood.svg';
import BronzeDivisionIcon from '../../assets/website/division_icons/dummy/bronze.svg';
import SilverDivisionIcon from '../../assets/website/division_icons/dummy/silver.svg';
import GoldenDivisionIcon from '../../assets/website/division_icons/dummy/golden.svg';
import PlatinumDivisionIcon from '../../assets/website/division_icons/dummy/platinum.svg';
import TitanDivisionIcon from '../../assets/website/division_icons/dummy/titan.svg';

export const DIVISION_TO_ICON_MATCH = {
  BRONZE: <BronzeDivisionIcon />,
  SILVER: <SilverDivisionIcon />,
  GOLD: <GoldenDivisionIcon />,
  TITAN: <TitanDivisionIcon />,
};

export const LEADERBOARD_SLIDES = [
  {
    type: 'all',
    icon: null,
    id: getUUID(),
  },
  {
    type: 'titan',
    icon: <TitanDivisionIcon />,
    id: getUUID(),
  },
  {
    type: 'platinum',
    icon: <PlatinumDivisionIcon />,
    id: getUUID(),
  },
  {
    type: 'golden',
    icon: <GoldenDivisionIcon />,
    id: getUUID(),
  },
  {
    type: 'silver',
    icon: <SilverDivisionIcon />,
    id: getUUID(),
  },
  {
    type: 'bronze',
    icon: <BronzeDivisionIcon />,
    id: getUUID(),
  },
  {
    type: 'wood',
    icon: <WoodDivisionIcon />,
    id: getUUID(),
  },
];

export const SELECT_DIVISION_ITEMS = [
  {
    type: 'titan',
    icon: <TitanDivisionIcon />,
    id: getUUID(),
    caption: 'Titan',
  },
  {
    type: 'platinum',
    icon: <PlatinumDivisionIcon />,
    id: getUUID(),
    caption: 'Platinum',
  },
  {
    type: 'golden',
    icon: <GoldenDivisionIcon />,
    id: getUUID(),
    caption: 'Golden',
  },
  {
    type: 'silver',
    icon: <SilverDivisionIcon />,
    id: getUUID(),
    caption: 'Silver',
  },
  {
    type: 'bronze',
    icon: <BronzeDivisionIcon />,
    id: getUUID(),
    caption: 'Bronze',
  },
  {
    type: 'wood',
    icon: <WoodDivisionIcon />,
    id: getUUID(),
    caption: 'Wood',
  },
];
