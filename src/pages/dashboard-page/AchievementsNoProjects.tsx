import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Typography, styled } from '@material-ui/core';
import { i18n } from '@lingui/core';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AchievementsNoProjects(props: Props) {
  return (
    <Container>
      <Typography align="center">{i18n._("You haven't added any project.")}</Typography>
      <Typography align="center">
        {i18n._('Go to Achievements page and add projects you have participated in')}
      </Typography>
    </Container>
  );
}

const Container = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
