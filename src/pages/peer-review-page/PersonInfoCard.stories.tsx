import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { PersonInfoCard } from 'src/pages/peer-review-page/PersonInfoCard';
import { routerDecorator } from 'src/stories/decorators';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';

const avatar = 'https://material-ui.com/static/images/avatar/1.jpg';

storiesOf('PersonInfoCard', module)
  .addDecorator(themeDecorator())
  .addDecorator(routerDecorator())
  .add('Simple', () => {
    return (
      <Container maxWidth="md">
        <PersonInfoCard
          name="حمید رهام‌زاده"
          subheader="در ۲ پروژه از شما نظر خواسته"
          onComplete={() => {}}
          completed
        ></PersonInfoCard>
      </Container>
    );
  })
  .add('Disabled Action Button With avatar', () => {
    return (
      <Container maxWidth="md">
        <PersonInfoCard
          name="حمید رهام‌زاده"
          subheader="در ۲ پروژه از شما نظر خواسته"
          avatar={avatar}
          onComplete={() => {}}
        ></PersonInfoCard>
      </Container>
    );
  });
