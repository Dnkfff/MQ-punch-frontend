import React from 'react';

import { Auth, Balance, Dummy, Preview3DModal } from './templates';

const templatesList = (data) => ({
  // modal window
  'auth-modal': <Auth data={data} />,
  'balance-modal': <Balance data={data} />,
  'preview-3d-modal': <Preview3DModal data={data} />,
});

const modalSelectTemplateByData = (data) => {
  if (!data || !data.template) return <Dummy />;

  return templatesList(data)[data.template];
};

export default modalSelectTemplateByData;
