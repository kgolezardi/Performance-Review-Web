import * as OverlayScrollbars from 'overlayscrollbars';
import React, { forwardRef, HTMLAttributes, useRef } from 'react';
import { ImperativeHandles, useOverlayscrollbars } from './useOverlayscrollbars';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends HTMLAttributes<HTMLDivElement> {
  options?: OverlayScrollbars.Options;
}

type Props = FCProps<OwnProps>;

export const Overlayscrollbars = forwardRef(function(props: Props, instanceRef: React.Ref<ImperativeHandles>) {
  const ref = useRef<HTMLDivElement>(null);
  const { options, ...divProps } = props;
  useOverlayscrollbars(ref, options, instanceRef);

  return (
    <div {...divProps} ref={ref}>
      {props.children}
    </div>
  );
});
