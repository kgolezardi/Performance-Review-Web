import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Button, Grid, IconButton, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Link } from 'react-router-dom';
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
  const data = useFragment(fragment, props.data);
  const user = data.find((user) => user.id === activeId);

  if (!user) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" padding={3} height="100%">
      <div>
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
      </div>
      <Box flex={1} overflow="auto" marginTop={3}>
        <Box mb={2}>
          <Typography variant="h6">{i18n._('Achievements')}</Typography>
        </Box>
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
