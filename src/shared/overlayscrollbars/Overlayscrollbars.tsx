import * as OverlayScrollbars from 'overlayscrollbars';
import React, { HTMLAttributes, forwardRef, useImperativeHandle } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { styled } from '@material-ui/core';

import { ImperativeHandles, useOverlayscrollbars } from './useOverlayscrollbars';

interface OwnProps extends HTMLAttributes<HTMLDivElement> {
  options?: OverlayScrollbars.Options;
}

type Props = FCProps<OwnProps>;

export const Overlayscrollbars = forwardRef(function (props: Props, instanceRef: React.Ref<ImperativeHandles>) {
  const { options, ...divProps } = props;
  const [ref, instance] = useOverlayscrollbars(options);

  useImperativeHandle(instanceRef, () => ({ getOverlayScrollbar: () => instance }), [instance]);

  return (
    <div {...divProps} ref={ref}>
      <InnerDiv>{props.children}</InnerDiv>
    </div>
  );
});

const InnerDiv = styled('div')({ height: '100%' });
