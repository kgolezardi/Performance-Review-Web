import { storiesOf } from '@storybook/react';
import { Grid, Box } from '@material-ui/core';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { BoardList } from './BoardList';
import { UserCard } from 'src/shared/user-card/UserCard';

const PlaceHoler = () => {
  return <div>No Child! No Money!</div>;
};
const CustomBoardListWithChild = ({ title, count = 0 }: { title: string; count?: Number }) => {
  return (
    <BoardList listTitle={title} placeHolder={<PlaceHoler />}>
      {Array.from(Array(count)).map((item, index) => (
        <div key={index}>Oh my card! {index + 1}</div>
      ))}
    </BoardList>
  );
};
storiesOf('Board List', module)
  .addDecorator(themeDecorator())
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
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
          </BoardList>
          <BoardList listTitle="انجام شده">
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
            <UserCard userFullName="SomeOne" description="Foo is good because!" />
          </BoardList>
        </Grid>
      </Box>
    );
  });
