import React from 'react';
import { Button, Container } from '@material-ui/core';
import { Lorem } from 'src/stories/helpers';
import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';
import { themeDecorator } from 'src/stories/decorators';

import { StickyActionBar } from './StickyActionBar';

storiesOf('Sticky Action Bar', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Container>
        <Lorem paragraphCount={20} />
        <StickyActionBar>
          <Button>{i18n._('Cancel')}</Button>
          <Button variant="contained" color="primary">
            {i18n._('Submit')}
          </Button>
        </StickyActionBar>
      </Container>
    );
  });
