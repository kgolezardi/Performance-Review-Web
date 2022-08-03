import { i18n } from '@lingui/core';
import { Box, Container, createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { useAuthGuardUser } from 'src/core/auth';
import { FullPageSpinner } from 'src/shared/loading';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { PrintResultButton } from './PrintResultButton';
import { ProjectsResultPage } from './project-result-page/ProjectsResultPage';
import StrengthsWeaknessesResultPage from './strengths-weaknesses-result-page/StrengthsWeaknessesResultPage';

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
          <Tabs value={tab ?? 'achievements'}>
            <TabLink label={i18n._('Achievements')} value="achievements" to={toPrefix + '/achievements'} />
            <TabLink
              label={i18n._('Dominant Characteristics')}
              value="dominant-characteristics"
              to={toPrefix + '/dominant-characteristics'}
            />
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
                path={toPrefix + '/dominant-characteristics'}
                children={<StrengthsWeaknessesResultPage revieweeId={revieweeId} />}
              />
              <Route path={toPrefix + '/achievements'} children={<ProjectsResultPage revieweeId={revieweeId} />} />
              <Redirect to={toPrefix + '/achievements'} />
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
