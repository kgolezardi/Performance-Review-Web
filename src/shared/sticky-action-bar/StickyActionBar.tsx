import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { InView } from 'src/shared/in-view';

import { ActionBar, ActionBarProps } from './ActionBar';

interface OwnProps extends ActionBarProps {}

type Props = FCProps<OwnProps>;

export function StickyActionBar(props: Props) {
  return (
    <InView>
      <ActionBar {...props} />
    </InView>
  );
}
