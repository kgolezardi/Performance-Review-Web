import { i18n } from '@lingui/core';
import { makeStyles, Paper, Tab, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useCallback, useState } from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { CriteriaOutput } from 'src/shared/criteria-output';
import { DominantCharacteristicsOutput } from 'src/shared/dominant-characteristics-output';
import { TabPanel, TabPanelsProvider } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { TabsProps } from 'src/shared/tabs/types';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ManagerReviewProjects } from './ManagerReviewProjects';
import { ManagerReviewContentQuery } from './__generated__/ManagerReviewContentQuery.graphql';
import { ManagerReviewContent_user$key } from './__generated__/ManagerReviewContent_user.graphql';

const query = graphql`
  query ManagerReviewContentQuery($id: ID!) {
    viewer {
      user(id: $id) {
        ...ManagerReviewContent_user
      }
    }
  }
`;

const fragment = graphql`
  fragment ManagerReviewContent_user on UserNode {
    personReview {
      ...DominantCharacteristicsOutput_review
      ...CriteriaOutput_review
    }
    projectReviews {
      ...ManagerReviewProjects_reviews
    }
  }
`;

interface OwnProps {
  userId: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewContent(props: Props) {
  const { userId } = props;
  const classes = useStyles(props);
  const [tab, setTab] = useState(0);
  const data = useLazyLoadQuery<ManagerReviewContentQuery>(query, { id: userId });
  const user = useFragment<ManagerReviewContent_user$key>(fragment, data.viewer.user);

  const handleTabChange: TabsProps['onChange'] = useCallback((event, value: number) => {
    setTab(value);
  }, []);

  return (
    <Fragment>
      <Paper classes={{ root: classes.tabsPaper }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label={i18n._('Performance Competencies')} value={0} />
          <Tab label={i18n._('Dominant Characteristics')} value={1} />
          <Tab label={i18n._('Achievements')} value={2} />
        </Tabs>
      </Paper>
      <Paper classes={{ root: classes.tabPanelPaper }}>
        <TabPanelsProvider value={{ value: tab }}>
          <TabPanel value={0}>
            <CriteriaOutput review={user?.personReview ?? null} />
          </TabPanel>
          <TabPanel value={1}>
            <DominantCharacteristicsOutput review={user?.personReview ?? null} />
          </TabPanel>
          <TabPanel value={2}>
            <ManagerReviewProjects reviews={user?.projectReviews ?? null} />
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
});

const useStyles = makeStyles(styles, { name: 'ManagerReviewContent' });
type StyleProps = Styles<typeof styles>;
