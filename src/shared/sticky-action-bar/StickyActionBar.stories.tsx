import React from 'react';
import { Button } from 'src/shared/button';
import { Container } from '@material-ui/core';
import { Lorem } from 'src/stories/helpers';
import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';

import { StickyActionBar } from './StickyActionBar';

storiesOf('Sticky Action Bar', module).add('simple', () => {
  return (
    <Container>
      <Lorem paragraphCount={20} />
      <StickyActionBar>
        <Button color="grey">{i18n._('Cancel')}</Button>
        <Button variant="contained">{i18n._('Submit')}</Button>
      </StickyActionBar>
    </Container>
  );
});
