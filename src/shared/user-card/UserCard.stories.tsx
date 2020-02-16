import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { UserCard } from './UserCard';
storiesOf('User Card', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator())
  .add('default', () => {
    return <UserCard userFullName="SomeOne" description="Foo is good because!" />;
  });
