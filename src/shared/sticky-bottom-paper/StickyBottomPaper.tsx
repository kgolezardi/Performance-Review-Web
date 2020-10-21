import React, { ComponentProps } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { InView } from 'src/shared/in-view';

import { InViewPaper } from './InViewPaper';

interface OwnProps extends ComponentProps<typeof InViewPaper> {}

type Props = FCProps<OwnProps>;

export function StickyBottomPaper(props: Props) {
  return (
    <InView>
      <InViewPaper {...props} />
    </InView>
  );
}
