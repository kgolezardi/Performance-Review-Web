import PrintIcon from '@material-ui/icons/Print';
import React, { Suspense } from 'react';
import { Box, Container, Fab, Paper, Theme, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageSpinner } from 'src/shared/loading';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';

import CriteriaResultPage from './criteria-result-page/CriteriaResultPage';
import StrengthsWeaknessesResultPage from './strengths-weaknesses-result-page/StrengthsWeaknessesResultPage';
import { ProjectsResultPage } from './project-result-page/ProjectsResultPage';

interface Params {
  tab?: string;
}
interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function ResultPage(props: Props) {
  const classes = useStyles(props);
  const { tab } = useParams<Params>();
  const { id: revieweeId } = useAuthGuardUser();

  const toPrefix = '';

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box marginY={5}>
        <Paper classes={{ root: classes.tabsPaper }}>
          <Tabs value={tab ?? 'performance-competencies'}>
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
        <Paper classes={{ root: classes.tabPanelPaper }}>
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
                children={<CriteriaResultPage revieweeId={revieweeId} />}
              />
              <Route
                path={toPrefix + '/dominant-characteristics'}
                children={<StrengthsWeaknessesResultPage revieweeId={revieweeId} />}
              />
              <Route path={toPrefix + '/achievements'} children={<ProjectsResultPage revieweeId={revieweeId} />} />
              <Redirect to={toPrefix + '/performance-competencies'} />
            </Switch>
          </Suspense>
        </Paper>
        <Fab color="primary" className={classes.print} href={'/print'} target="_blank">
          <PrintIcon />
        </Fab>
      </Box>
    </Container>
  );
}
const styles = (theme: Theme) => ({
  container: {
    '@media print': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  tabsPaper: {
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar - 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    '@media print': {
      boxShadow: 'none',
    },
  } as CSSProperties,
  tabPanelPaper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '@media print': {
      boxShadow: 'none',
    },
  } as CSSProperties,
  print: {
    position: 'fixed',
    bottom: 48,
    left: 40,
    zIndex: theme.zIndex.snackbar - 10,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ResultPage' });
type StyleProps = Styles<typeof styles>;
