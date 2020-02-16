import { i18n } from '@lingui/core';
import { Box, Container, makeStyles, Paper, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { FullPageSpinner } from 'src/shared/loading';
import { TabLink } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface Params {
  tab?: string;
}

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function PeerReviewPage(props: Props) {
  const classes = useStyles(props);
  const { tab } = useParams<Params>();
  const toPrefix = '/peer-review';

  return (
    <Container maxWidth="md">
      <Paper classes={{ root: classes.topPaper }}>
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
      </Paper>
      <Box marginY={5}>
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
                children={<div>Performance Competencies</div>} /* TODO: Create Performance Competencies page here */
              />
              <Route
                path={toPrefix + '/dominant-characteristics'}
                children={<div>Dominant Characteristics</div>} /* TODO: Create Dominant Characteristics page here */
              />
              <Route path={toPrefix + '/achievements'} children={<div>Achievements</div>} />
              {/* TODO: Create Achievements page here */}
              <Redirect to={toPrefix + '/performance-competencies'} />
            </Switch>
          </Suspense>
        </Paper>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) => ({
  topPaper: {
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar - 25,
    marginLeft: -theme.spacing(3),
    marginRight: -theme.spacing(3),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PeerReviewPage' });
type StyleProps = Styles<typeof styles>;
