import { i18n } from '@lingui/core';
import { Box, Container, Grid, makeStyles, Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import { indexBy } from 'ramda';
import React, { useCallback, useMemo, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { TabPanel, TabPanelsProvider } from 'src/shared/tab';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ManagerReviewPageQuery } from './__generated__/ManagerReviewPageQuery.graphql';
import { DominantCharacteristicsManagerReview } from './DominantCharacteristics';
import { ManagerReviewMembersList } from './ManagerReviewMembersList';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

// const findPersonReview =
const getReviewId = (
  review: // project review or person review
  ElementType<
    | ManagerReviewPageQuery['response']['viewer']['personReviews']
    | ManagerReviewPageQuery['response']['viewer']['projectReviews']
  >,
) => review.reviewee.id;

export default function ManagerReviewPage(props: Props) {
  const classes = useStyles(props);
  const [tab, setTab] = useState(0);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const data = useLazyLoadQuery<ManagerReviewPageQuery>(query, {});

  const dominantCharacteristics = useMemo(() => indexBy(getReviewId, data.viewer.personReviews), [
    data.viewer.personReviews,
  ]);
  const currentDominantCharacteristics = !!selectedUserId ? dominantCharacteristics[selectedUserId] : null;

  const handleOnUserClick = useCallback((id: string | null) => {
    setSelectedUserId(id);
  }, []);

  const handleTabChange = useCallback((event: React.ChangeEvent<{}>, value: any) => {
    setTab(value);
  }, []);

  return (
    <Container maxWidth="md">
      <Box marginY={5}>
        <Grid container>
          <Grid item xs={3}>
            <ManagerReviewMembersList
              personReviews={data.viewer.personReviews}
              projectReviews={data.viewer.projectReviews}
              onClick={handleOnUserClick}
            />
          </Grid>
          <Grid item xs={9}>
            <Paper classes={{ root: classes.tabsPaper }}>
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                centered
                onChange={handleTabChange}
                classes={{ scroller: classes.tabsScroller, indicator: classes.indicator }}
              >
                <Tab label={i18n._('Performance Competencies')} value={0} />
                <Tab label={i18n._('Dominant Characteristics')} value={1} />
                <Tab label={i18n._('Achievements')} value={2} />
              </Tabs>
            </Paper>
            <Paper classes={{ root: classes.tabPanelPaper }}>
              <TabPanelsProvider value={{ value: tab }}>
                <TabPanel value={0}>
                  {/*Add performance competencies component here*/}
                  {i18n._('Performance Competencies')}
                </TabPanel>
                <TabPanel value={1}>
                  {currentDominantCharacteristics && (
                    <DominantCharacteristicsManagerReview review={currentDominantCharacteristics} />
                  )}
                </TabPanel>
                <TabPanel value={2}>
                  {/*Add achievements component here*/}
                  {i18n._('Achievements')}
                </TabPanel>
              </TabPanelsProvider>
            </Paper>
          </Grid>
        </Grid>
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

const useStyles = makeStyles(styles, { name: 'ManagerReviewPage' });
type StyleProps = Styles<typeof styles>;

const query = graphql`
  query ManagerReviewPageQuery {
    viewer {
      personReviews {
        reviewee {
          id
        }
        ...ManagerReviewMembersList_personReviews
        ...DominantCharacteristicsManagerReview_review
      }
      projectReviews {
        reviewee {
          id
        }
        ...ManagerReviewMembersList_projectReviews
      }
    }
  }
`;
