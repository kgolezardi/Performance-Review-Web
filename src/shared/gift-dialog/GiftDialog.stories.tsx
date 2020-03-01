import React, { Fragment, useCallback, useState } from 'react';
import { Button } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';

import { GiftDialog } from './GiftDialog';

storiesOf('Gift Dialog', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .add('default', () => {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
      setOpen(true);
    }, []);

    return (
      <Fragment>
        <Button onClick={handleClick}>Open</Button>
        <GiftDialog open={open} onRecieveClick={action('onRecieveClick')} onLaterClick={action('onLaterClick')} />
      </Fragment>
    );
  });
