import React, { useRef } from 'react';
import { Lorem } from 'src/stories/helpers';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators';

import { ImperativeHandles } from './useOverlayscrollbars';
import { Overlayscrollbars } from './Overlayscrollbars';

storiesOf('Overlayscrollbars', module)
  .addDecorator(storyWrapperDecorator({ height: 600 }))
  .add('Default', () => (
    <Overlayscrollbars style={{ maxHeight: 500, maxWidth: 300 }}>
      <Lorem />
    </Overlayscrollbars>
  ))
  .add('Scroll', () => {
    const instanceRef = useRef<ImperativeHandles>(null);
    const targetRef = useRef<HTMLDivElement | null>(null);

    return (
      <Overlayscrollbars style={{ maxHeight: 500, maxWidth: 300 }} ref={instanceRef}>
        <button
          onClick={() => {
            const instance = instanceRef && instanceRef.current && instanceRef.current.getOverlayScrollbar();
            instance && targetRef.current && instance.scroll(targetRef.current, 250, 'easeInCubic');
          }}
        >
          Scroll
        </button>
        <div>
          <Lorem />
        </div>
        <div ref={targetRef} style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <Lorem />
        </div>
      </Overlayscrollbars>
    );
  });
