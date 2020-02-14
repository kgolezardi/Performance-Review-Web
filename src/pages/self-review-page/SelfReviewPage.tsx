import { i18n } from '@lingui/core';
import { Box, Container, makeStyles, Paper, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { Suspense } from 'react';
import { Redirect, Route, Routes, useParams } from 'react-router-dom';
import CriteriaPage from 'src/pages/criteria-page/CriteriaPage';
import ProjectsPage from 'src/pages/projects-page/ProjectsPage';
import StrengthsWeaknessesPage from 'src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage';
import { FullPageSpinner } from 'src/shared/loading';
import { TabLink } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface Params {
  '*': string;
}
interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function SelfReviewPage(props: Props) {
  const classes = useStyles(props);
  const params = useParams<Params>();
  const tab = params['*']; // TODO change when useRouteMatch is back
  return (
    <Container maxWidth="md">
      <Box marginY={5}>
        <Paper classes={{ root: classes.tabsPaper }}>
          <Tabs
            value={tab ?? 'performance-competencies'}
            indicatorColor="primary"
            textColor="primary"
            centered
            classes={{ scroller: classes.tabsScroller, indicator: classes.indicator }}
          >
            <TabLink
              label={i18n._('Performance Competencies')}
              value="performance-competencies"
              to="performance-competencies"
            />
            <TabLink
              label={i18n._('Dominant Characteristics')}
              value="dominant-characteristics"
              to="dominant-characteristics"
            />
            <TabLink label={i18n._('Achievements')} value="achievements" to="achievements" />
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
            <Routes>
              <Route path="performance-competencies" element={<CriteriaPage />} />
              <Route path="dominant-characteristics" element={<StrengthsWeaknessesPage />} />
              <Route path="achievements" element={<ProjectsPage />} />
              <Redirect path="/" to="performance-competencies" />
            </Routes>
          </Suspense>
        </Paper>
      </Box>
    </Container>
  );
}
const styles = (theme: Theme) => ({
  tabsPaper: {
    position: 'sticky',
    top: 0,
    zIndex: theme.zIndex.appBar - 25,
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
  indicator: {
    height: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'SelfReviewPage' });
type StyleProps = Styles<typeof styles>;
