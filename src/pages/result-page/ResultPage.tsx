import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { Box, Container, Paper, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageSpinner } from 'src/shared/loading';
import { PrintButton } from 'src/shared/print-button';
import { QuoteBox } from 'src/shared/quote-box';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';
import { useLazyLoadQuery } from 'react-relay/hooks';

import StrengthsWeaknessesResultPage from './strengths-weaknesses-result-page/StrengthsWeaknessesResultPage';
import { ProjectsResultPage } from './project-result-page/ProjectsResultPage';
import { ResultPageQuery } from './__generated__/ResultPageQuery.graphql';

const query = graphql`
  query ResultPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        managerPersonReview {
          overallRating
        }
      }
    }
  }
`;
interface Params {
  tab?: string;
}
interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function ResultPage(props: Props) {
  const classes = useStyles(props);
  const { tab } = useParams<Params>();
  const { id: revieweeId } = useAuthGuardUser();
  const data = useLazyLoadQuery<ResultPageQuery>(query, { id: revieweeId });
  const toPrefix = '';

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box marginY={5}>
        <QuoteBox border="1px solid #00800033" textAlign="center" color="green" mb={2} bgcolor="success.light">
          <Typography variant="h6">{`${i18n._("Manager's Overall Evaluation of Your Performance")}:`}</Typography>
          <EvaluationOutput type="peer" value={data.viewer.user?.managerPersonReview?.overallRating} />
        </QuoteBox>
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
      <PrintButton printSrc="/print" id="print-result" />
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
    container: {
      overflow: 'hidden',
    },
  });

const useStyles = makeStyles(styles, { name: 'ResultPage' });
type StyleProps = Styles<typeof styles>;
