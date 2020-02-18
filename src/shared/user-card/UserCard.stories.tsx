import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWrapperDecorator, themeDecorator, routerDecorator } from 'src/stories/decorators';
import { UserCard } from './UserCard';
storiesOf('User Card', module)
  .addDecorator(themeDecorator())
  .addDecorator(routerDecorator())
  .addDecorator(storyWrapperDecorator())
  .add('default', () => {
    return <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />;
  });
