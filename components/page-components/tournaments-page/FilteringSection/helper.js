import {
  INPUT_TYPE,
  DIVISION_SELECTOR_TYPE,
  DOUBLE_DATE_SELECTOR_TYPE,
} from 'services/constants/form';
import { getUUID } from 'services/get-uuid/get-uuid';

export const generateFilteringForm = (filteringArray) => {
  const resultObject = {};

  filteringArray.forEach((el) => {
    switch (el.type) {
      case INPUT_TYPE:
        resultObject[el.field] = {
          ...el,
          value: null,
          id: getUUID(),
        };
        break;
      case DIVISION_SELECTOR_TYPE:
        resultObject[el.field] = {
          ...el,
          values: null,
          id: getUUID(),
        };
        break;
      case DOUBLE_DATE_SELECTOR_TYPE:
        resultObject[el.field] = {
          ...el,
          startDate: {
            value: null,
          },
          endDate: {
            value: null,
          },
          id: getUUID(),
        };
        break;
      default:
        throw new Error('this form type doesn`t exist');
    }
  });

  return resultObject;
};
