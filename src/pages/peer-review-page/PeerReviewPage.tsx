import { i18n } from '@lingui/core';
import { Box, Container, makeStyles, Paper, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import CriteriaPage from 'src/pages/criteria-page/CriteriaPage';
import { ProjectCommentPage } from 'src/pages/project-comment-page';
import { FullPageSpinner } from 'src/shared/loading';
import { TabLink } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { unescape } from 'src/shared/utils/base64.util';
import { PersonInfoCard } from './PersonInfoCard';
import { PeerReviewPageQuery } from './__generated__/PeerReviewPageQuery.graphql';

const peerReviewPageQuery = graphql`
  query PeerReviewPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        ...PersonInfoCard_user
      }
    }
  }
`;

interface Params {
  uid: string;
  tab?: string;
}

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function PeerReviewPage(props: Props) {
  const classes = useStyles(props);
  const { tab, uid } = useParams<Params>();
  const toPrefix = '/peer-review/' + uid;
  const revieweeId = unescape(uid);

  const data = useLazyLoadQuery<PeerReviewPageQuery>(peerReviewPageQuery, { id: revieweeId });

  if (!data.viewer.user) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <Container maxWidth="md">
      <Box marginY={5}>
        <PersonInfoCard user={data.viewer.user} classes={{ root: classes.personInfoCardRoot }}>
          <Tabs value={tab ?? 'performance-competencies'} indicatorColor="primary" textColor="primary" centered>
            <TabLink
              label={i18n._('Performance Competencies')}
              value="performance-competencies"
              to={toPrefix + '/performance-competencies'}
            />
            <TabLink
              label={i18n._('Dominant Characteristics')}
              value="dominant-characteristics"
              to={toPrefix + '/dominant-characteristics'}
            />
            <TabLink label={i18n._('Achievements')} value="achievements" to={toPrefix + '/achievements'} />
          </Tabs>
        </PersonInfoCard>
      </Box>
      <Box marginY={2}>
        <Paper>
          <Suspense
            fallback={
              <Box height={200}>
                <FullPageSpinner />
              </Box>
            }
          >
            <Switch>
              <Route
                path={toPrefix + '/performance-competencies'}
                children={<CriteriaPage revieweeId={revieweeId} />}
              />
              <Route
                path={toPrefix + '/dominant-characteristics'}
                children={<div>todo: Dominant Characteristics</div>}
              />
              <Route path={toPrefix + '/achievements'} children={<ProjectCommentPage revieweeId={revieweeId} />} />
              <Redirect to={toPrefix + '/performance-competencies'} />
            </Switch>
          </Suspense>
        </Paper>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) => ({
  personInfoCardRoot: {
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar - 25,
    marginLeft: -theme.spacing(3),
    marginRight: -theme.spacing(3),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PeerReviewPage' });
type StyleProps = Styles<typeof styles>;
