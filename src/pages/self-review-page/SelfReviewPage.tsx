import { i18n } from '@lingui/core';
import { Box, Container, makeStyles, Paper, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import CriteriaPage from 'src/pages/criteria-page/CriteriaPage';
import ProjectsPage from 'src/pages/projects-page/ProjectsPage';
import StrengthsWeaknessesPage from 'src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage';
import { TabLink } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface Params {
  tab?: string;
}
interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function SelfReviewPage(props: Props) {
  const classes = useStyles(props);
  const { tab } = useParams<Params>();
  const toPrefix = '/self-review';

  return (
    <Container maxWidth="md">
      <Box marginY={5}>
        <Paper classes={{ root: classes.tabsPaper }}>
          <Tabs
            value={tab ?? 'performance-competencies'}
            indicatorColor="primary"
            textColor="primary"
            centered
            classes={{ scroller: classes.tabsScroller }}
          >
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
          <Switch>
            <Route path={toPrefix + '/performance-competencies'} component={CriteriaPage} />
            <Route path={toPrefix + '/dominant-characteristics'} component={StrengthsWeaknessesPage} />
            <Route path={toPrefix + '/achievements'} component={ProjectsPage} />
            <Redirect to={toPrefix + '/performance-competencies'} />
          </Switch>
        </Paper>
      </Box>
    </Container>
  );
}
const styles = (theme: Theme) => ({
  tabsPaper: {
    position: 'relative',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  } as CSSProperties,
  tabPanelPaper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  } as CSSProperties,
  tabsScroller: {
    display: 'block',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'SelfReviewPage' });
type StyleProps = Styles<typeof styles>;
