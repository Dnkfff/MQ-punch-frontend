import { getUUID } from '../../../../../../inside-services/get-uuid/get-uuid';

// assets
import WoodDivisionIcon from '../../../../../../assets/website/division_icons/dummy/wood.svg';
import BronzeDivisionIcon from '../../../../../../assets/website/division_icons/dummy/bronze.svg';
import SilverDivisionIcon from '../../../../../../assets/website/division_icons/dummy/silver.svg';
import GoldenDivisionIcon from '../../../../../../assets/website/division_icons/dummy/golden.svg';
import PlatinumDivisionIcon from '../../../../../../assets/website/division_icons/dummy/platinum.svg';
import TitanDivisionIcon from '../../../../../../assets/website/division_icons/dummy/titan.svg';

export const slides = [
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
