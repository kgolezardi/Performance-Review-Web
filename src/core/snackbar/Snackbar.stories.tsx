import { i18n } from '@lingui/core';
import { Button, Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { snackbarDecorator, themeDecorator } from 'src/stories/decorators';
import { useSnackbar } from 'notistack';

storiesOf('Snackbar', module)
  .addDecorator(snackbarDecorator())
  .addDecorator(themeDecorator())
  .add('success', () => {
    const { enqueueSnackbar } = useSnackbar();
    return (
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
          }}
        >
          {i18n._('Submit')}
        </Button>
      </Container>
    );
  })
  .add('error', () => {
    const { enqueueSnackbar } = useSnackbar();
    return (
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
          }}
        >
          {i18n._('Submit')}
        </Button>
      </Container>
    );
  });
