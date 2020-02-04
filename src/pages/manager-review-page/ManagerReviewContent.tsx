import { i18n } from '@lingui/core';
import { Box, makeStyles, Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useCallback, useState } from 'react';
import { useFragment } from 'react-relay/hooks';
import { CriteriaManagerReview } from 'src/shared/criteria-manager-review';
import { ProjectManagerReview } from 'src/shared/project-manager-review';
import { TabPanel, TabPanelsProvider } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { DominantCharacteristicsManagerReview } from './DominantCharacteristics';
import { useCurrentPersonReview } from './useCurrentPersonReview';
import { useCurrentProjectReviews } from './useCurrentProjectReviews';
import { ManagerReviewContent_personReviews$key } from './__generated__/ManagerReviewContent_personReviews.graphql';
import { ManagerReviewContent_projectReviews$key } from './__generated__/ManagerReviewContent_projectReviews.graphql';

interface OwnProps {
  personReviews: ManagerReviewContent_personReviews$key;
  projectReviews: ManagerReviewContent_projectReviews$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewContent(props: Props) {
  const classes = useStyles(props);
  const [tab, setTab] = useState(0);

  const handleTabChange = useCallback((event: React.ChangeEvent<{}>, value: any) => {
    setTab(value);
  }, []);

  const personReviews = useFragment(personReviewsFragment, props.personReviews);

  const projectReviews = useFragment(projectReviewsFragment, props.projectReviews);

  const currentPersonReview = useCurrentPersonReview(personReviews);

  const currentProjectReviews = useCurrentProjectReviews(projectReviews);

  return (
    <Fragment>
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
          <TabPanel value={0}>{currentPersonReview && <CriteriaManagerReview review={currentPersonReview} />}</TabPanel>
          <TabPanel value={1}>
            {currentPersonReview && <DominantCharacteristicsManagerReview review={currentPersonReview} />}
          </TabPanel>
          <TabPanel value={2}>
            <Box paddingTop={4}>
              {currentProjectReviews.map((review, index) => (
                <ProjectManagerReview review={review} key={index} />
              ))}
            </Box>
          </TabPanel>
        </TabPanelsProvider>
      </Paper>
    </Fragment>
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

const useStyles = makeStyles(styles, { name: 'ManagerReviewContent' });
type StyleProps = Styles<typeof styles>;

const personReviewsFragment = graphql`
  fragment ManagerReviewContent_personReviews on PersonReviewNode @relay(plural: true) {
    reviewee {
      id
    }
    ...DominantCharacteristicsManagerReview_review
    ...CriteriaManagerReview_review
  }
`;

const projectReviewsFragment = graphql`
  fragment ManagerReviewContent_projectReviews on ProjectReviewNode @relay(plural: true) {
    reviewee {
      id
    }
    ...ProjectManagerReview_review
  }
`;
