import React, { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';
import { LoremIpsum } from 'lorem-ipsum';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators';

import { InView } from './InView';
import { useInViewContext } from './InViewContext';

const Component = () => {
  const { topInView, bottomInView } = useInViewContext();
  const color = topInView ? 'blue' : bottomInView ? 'red' : 'black';
  return (
    <Fragment>
      <div style={{ position: 'fixed', top: 0 }}>
        <Typography>{`topInView: ${topInView}`}</Typography>
        <Typography>{`bottomInView: ${bottomInView}`}</Typography>
      </div>
      <Box color={color}>{new LoremIpsum().generateParagraphs(10)}</Box>
    </Fragment>
  );
};

storiesOf('In View', module)
  .addDecorator(storyWrapperDecorator({}))
  .add('default', () => (
    <Overlayscrollbars style={{ height: '100%' }}>
      <InView>
        <Component />
      </InView>
    </Overlayscrollbars>
  ));
