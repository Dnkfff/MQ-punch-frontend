import { getUUID } from '../../../../../../inside-services/get-uuid/get-uuid';

// assets
import woodDivisionIcon from '../../../../../../assets/website/division_icons/dummy/wood.svg';
import bronzeDivisionIcon from '../../../../../../assets/website/division_icons/dummy/bronze.svg';
import silverDivisionIcon from '../../../../../../assets/website/division_icons/dummy/silver.svg';
import goldenDivisionIcon from '../../../../../../assets/website/division_icons/dummy/golden.svg';
import platinumDivisionIcon from '../../../../../../assets/website/division_icons/dummy/platinum.svg';
import titanDivisionIcon from '../../../../../../assets/website/division_icons/dummy/titan.svg';

export const slides = [
  {
    type: 'all',
    icon: null,
    id: getUUID(),
  },
  {
    type: 'titan',
    icon: titanDivisionIcon,
    id: getUUID(),
  },
  {
    type: 'platinum',
    icon: platinumDivisionIcon,
    id: getUUID(),
  },
  {
    type: 'golden',
    icon: goldenDivisionIcon,
    id: getUUID(),
  },
  {
    type: 'silver',
    icon: silverDivisionIcon,
    id: getUUID(),
  },
  {
    type: 'bronze',
    icon: bronzeDivisionIcon,
    id: getUUID(),
  },
  {
    type: 'wood',
    icon: woodDivisionIcon,
    id: getUUID(),
  },
];
