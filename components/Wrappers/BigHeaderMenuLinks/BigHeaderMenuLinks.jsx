import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { bigHeaderMenuLinks } from 'services/constants/constants';

const BigHeaderMenuLinks = () => {
  const router = useRouter();

  return bigHeaderMenuLinks.map((el) => (
    <Link
      key={el.id}
      href={{
        pathname: el.pathname,
      }}
    >
      <a className={router.pathname.includes(el.pathname) ? 'active' : 'no-active'}>{el.label}</a>
    </Link>
  ));
};

export default BigHeaderMenuLinks;
