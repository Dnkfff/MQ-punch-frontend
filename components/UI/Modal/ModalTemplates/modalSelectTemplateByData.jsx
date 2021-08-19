import React from 'react';

import { Auth, Dummy } from './templates';

const templatesList = (data) => ({
  // modal window
  'auth-modal': <Auth data={data} />,
});

const modalSelectTemplateByData = (data) => {
  if (!data || !data.template) return <Dummy />;

  return templatesList(data)[data.template];
};

export default modalSelectTemplateByData;
