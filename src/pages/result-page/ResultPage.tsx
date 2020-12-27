import React, { Suspense } from 'react';
import { Box, Container, Paper, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageSpinner } from 'src/shared/loading';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';

import StrengthsWeaknessesResultPage from './strengths-weaknesses-result-page/StrengthsWeaknessesResultPage';
import { PrintResultButton } from './PrintResultButton';
import { ProjectsResultPage } from './project-result-page/ProjectsResultPage';
import { ResultBehavioralCompetencies } from './behavioral-competencies';

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
    <Container maxWidth="md">
      <Box marginY={5}>
        <Paper classes={{ root: classes.tabsPaper }}>
          <Tabs value={tab ?? 'behavioral-competencies'}>
            <TabLink
              label={i18n._('Behavioral Competencies')}
              value="behavioral-competencies"
              to={toPrefix + '/behavioral-competencies'}
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
                path={toPrefix + '/behavioral-competencies'}
                children={<ResultBehavioralCompetencies revieweeId={revieweeId} />}
              />
              <Route
                path={toPrefix + '/dominant-characteristics'}
                children={<StrengthsWeaknessesResultPage revieweeId={revieweeId} />}
              />
              <Route path={toPrefix + '/achievements'} children={<ProjectsResultPage revieweeId={revieweeId} />} />
              <Redirect to={toPrefix + '/behavioral-competencies'} />
            </Switch>
          </Suspense>
        </Paper>
      </Box>
      <PrintResultButton />
    </Container>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    tabsPaper: {
      position: 'sticky',
      top: 0,
      zIndex: theme.zIndex.appBar - 25,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    tabPanelPaper: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  });

const useStyles = makeStyles(styles, { name: 'ResultPage' });
type StyleProps = Styles<typeof styles>;
