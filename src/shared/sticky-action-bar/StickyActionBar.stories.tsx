import { i18n } from '@lingui/core';
import { Button, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { StickyActionBar } from './StickyActionBar';
import { themeDecorator } from 'src/stories/decorators';
import { Lorem } from 'src/stories/helpers';

storiesOf('Sticky Action Bar', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Container>
        <Lorem paragraphCount={20} />
        <StickyActionBar elevation={4}>
          <Button>{i18n._('Cancel')}</Button>
          <Button variant="contained" color="primary">
            {i18n._('Submit')}
          </Button>
        </StickyActionBar>
      </Container>
    );
  });
