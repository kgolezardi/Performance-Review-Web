import CloseIcon from '@material-ui/icons/Close';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, Tab, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Link } from 'react-router-dom';
import { TabPanel, TabPanelsProvider } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { UserAvatar } from 'src/shared/user-avatar';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { EvaluationItemOutput } from './EvaluationItemOutput';
import { ItemOutput } from './ItemOutput';
import { ManagerReviewDashboardDrawerContent_data$key } from './__generated__/ManagerReviewDashboardDrawerContent_data.graphql';

const fragment = graphql`
  fragment ManagerReviewDashboardDrawerContent_data on UserNode @relay(plural: true) {
    id
    manager {
      ...getUserLabel_user
    }
    managerPersonReview {
      sahabinessRating
      problemSolvingRating
      executionRating
      thoughtLeadershipRating
      leadershipRating
      presenceRating
      overallRating
    }
    projectReviews {
      id
      projectName
      managerComment {
        rating
      }
    }
    ...UserAvatar_user
    ...getUserLabel_user
  }
`;

interface OwnProps {
  activeId: string;
  data: ManagerReviewDashboardDrawerContent_data$key;
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewDashboardDrawerContent(props: Props) {
  const { activeId, onCloseClick } = props;
  const classes = useStyles(props);
  const [tab, setTab] = useState(0);
  const data = useFragment(fragment, props.data);
  const user = data.find((user) => user.id === activeId);

  if (!user) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" padding={3} height="100%">
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton onClick={onCloseClick}>
            <CloseIcon />
          </IconButton>
          <Link className={classes.link} to={`manager-review/${user.id}`}>
            <Button color="primary" variant="outlined">
              {i18n._('See More')}
            </Button>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" py={2}>
          <UserAvatar user={user} />
          <Box marginLeft={2}>
            <Typography variant="h5">{getUserLabel(user)}</Typography>
          </Box>
        </Box>
        <Box py={2} display="flex" justifyContent="space-between">
          <ItemOutput title={i18n._('Manager')} value={user.manager ? getUserLabel(user.manager) : null} />
          <EvaluationItemOutput
            title={i18n._('Overall Evaluation')}
            type="peer"
            value={user.managerPersonReview?.overallRating ?? null}
          />
        </Box>

        <Tabs onChange={handleChange} value={tab}>
          <Tab label={i18n._('Behavioral Competencies')} value={0} />
          <Tab label={i18n._('Achievements')} value={1} />
        </Tabs>
      </Box>
      <Box flex={1} overflow="auto" marginTop={3}>
        <TabPanelsProvider value={tab}>
          <TabPanel value={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <EvaluationItemOutput
                  title={i18n._('Organization Culture Adoption')}
                  type="peer"
                  value={user.managerPersonReview?.sahabinessRating ?? null}
                />
              </Grid>

              <Grid item xs={12}>
                <EvaluationItemOutput
                  title={i18n._('Problem Solving')}
                  type="peer"
                  value={user.managerPersonReview?.problemSolvingRating ?? null}
                />
              </Grid>

              <Grid item xs={12}>
                <EvaluationItemOutput
                  title={i18n._('Output Quality')}
                  type="peer"
                  value={user.managerPersonReview?.executionRating ?? null}
                />
              </Grid>

              <Grid item xs={12}>
                <EvaluationItemOutput
                  title={i18n._('Thought Leadership')}
                  type="peer"
                  value={user.managerPersonReview?.thoughtLeadershipRating ?? null}
                />
              </Grid>

              <Grid item xs={12}>
                <EvaluationItemOutput
                  title={i18n._('Leadership')}
                  type="peer"
                  value={user.managerPersonReview?.leadershipRating ?? null}
                />
              </Grid>

              <Grid item xs={12}>
                <EvaluationItemOutput
                  title={i18n._('Presence')}
                  type="peer"
                  value={user.managerPersonReview?.presenceRating ?? null}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={1}>
            <Grid container spacing={3}>
              {user.projectReviews.map((projectReview) => (
                <Grid item xs={12} key={projectReview.id}>
                  <EvaluationItemOutput
                    title={projectReview.projectName}
                    type="peer"
                    value={projectReview.managerComment?.rating ?? null}
                  />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabPanelsProvider>
      </Box>
    </Box>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    link: {
      textDecoration: 'none',
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewDashboardDrawerContent' });
