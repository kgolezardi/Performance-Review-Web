import React from 'react';
import clsx from 'clsx';
import graphql from 'babel-plugin-relay/macro';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars/Overlayscrollbars';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { AchievementsIndicators } from './AchievementsIndicators';
import { DashboardPageQuery } from './__generated__/DashboardPageQuery.graphql';
import { DominantCharacteristicsCircularIndicator } from './DominantCharacteristicsCircularIndicator';
import { LinkButton } from './LinkButton';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

const query = graphql`
  query DashboardPageQuery($id: ID!) {
    viewer {
      user: user(id: $id) {
        selfPersonReview {
          ...DominantCharacteristicsCircularIndicator_review
        }
      }
      projects: projectReviews {
        ...AchievementsIndicators_projects
      }
    }
  }
`;

export default function DashboardPage(props: Props) {
  const classes = useStyles(props);

  const { id } = useAuthGuardUser();

  const data = useLazyLoadQuery<DashboardPageQuery>(query, { id });

  return (
    <Container maxWidth="md">
      <Box marginY={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card classes={{ root: clsx(classes.card, classes.achievementsCard) }}>
              <CardHeader title={i18n._('Achievements')} />
              <Overlayscrollbars className={classes.overlayscrollbars}>
                <CardContent className={classes.achievementCardContent}>
                  <AchievementsIndicators projects={data.viewer.projects} />
                </CardContent>
              </Overlayscrollbars>
              <Box paddingX={5} paddingBottom={3}>
                <LinkButton to="/self-review/achievements" />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card classes={{ root: classes.card }}>
              <CardHeader title={i18n._('Dominant Characteristics')} />
              <CardContent classes={{ root: classes.centerCardContent }}>
                <DominantCharacteristicsCircularIndicator review={data.viewer.user?.selfPersonReview ?? null} />
              </CardContent>
              <Box paddingX={5} paddingBottom={3}>
                <LinkButton to="/self-review/dominant-characteristics" />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      height: 400,
      display: 'flex',
      flexDirection: 'column',
    },
    centerCardContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    achievementsCard: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    overlayscrollbars: {
      flex: 1,
      marginBottom: theme.spacing(3),
    },
    achievementCardContent: {
      height: '100%',
      paddingTop: 0,
    },
  });

const useStyles = makeStyles(styles, { name: 'DashboardPage' });
type StyleProps = Styles<typeof styles>;
