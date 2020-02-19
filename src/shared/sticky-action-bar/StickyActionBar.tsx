import React from 'react';
import { InView } from 'src/shared/in-view';
import { ActionBar, ActionBarProps } from 'src/shared/sticky-action-bar/ActionBar';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends ActionBarProps {}

type Props = FCProps<OwnProps>;

export function StickyActionBar(props: Props) {
  return (
    <InView>
      <ActionBar {...props} />
    </InView>
  );
}
