import { i18n } from '@lingui/core';
import { Button, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Lorem } from 'src/stories/helpers';
import { StickyBottomPaper } from './StickyBottomPaper';

storiesOf('Sticky Bottom Paper', module).add('simple', () => {
  return (
    <Container>
      <Lorem paragraphCount={20} />
      <StickyBottomPaper>
        <Button>{i18n._('Cancel')}</Button>
        <Button variant="contained" color="primary">
          {i18n._('Submit')}
        </Button>
      </StickyBottomPaper>
    </Container>
  );
});
