import { loremIpsum } from 'lorem-ipsum';
import React, { Fragment, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  paragraphCount?: number;
}

type Props = FCProps<OwnProps>;

export function Lorem(props: Props) {
  const { paragraphCount = 5 } = props;
  const [ps] = useState(() => loremIpsum({ count: paragraphCount, units: 'paragraph' }).split('\n'));
  return (
    <Fragment>
      {ps.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </Fragment>
  );
}
