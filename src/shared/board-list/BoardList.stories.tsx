import { Box, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { UserCard } from 'src/shared/user-card/UserCard';
import { routerDecorator, themeDecorator } from 'src/stories/decorators';
import { BoardList } from './BoardList';
import { PlaceHolder } from './PlaceHolder';

const PlaceHolerExample = () => {
  return (
    <PlaceHolder>
      <div>No Child! No Money!</div>
    </PlaceHolder>
  );
};
const CustomBoardListWithChild = ({ title, count = 0 }: { title: string; count?: Number }) => {
  return (
    <BoardList listTitle={title}>
      {count ? (
        Array.from(Array(count)).map((item, index) => <div key={index}>Oh my card! {index + 1}</div>)
      ) : (
        <PlaceHolerExample />
      )}
    </BoardList>
  );
};
storiesOf('Board List', module)
  .addDecorator(themeDecorator())
  .addDecorator(routerDecorator())
  .add('default', () => {
    return (
      <Box padding={2}>
        <Grid container spacing={2}>
          <CustomBoardListWithChild title="انجام نشده" count={50} />
          <CustomBoardListWithChild title="در حال انجام" count={3} />
          <CustomBoardListWithChild title="انجام شده" />
        </Grid>
      </Box>
    );
  })
  .add('with user card', () => {
    return (
      <Box padding={2}>
        <Grid container spacing={2}>
          <BoardList listTitle="انجام نشده">
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
          </BoardList>
          <BoardList listTitle="انجام شده">
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userId="my-id" userFullName="SomeOne" description="Foo is good because!" />
          </BoardList>
        </Grid>
      </Box>
    );
  });
