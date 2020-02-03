import { i18n } from '@lingui/core';
import { Box, Container, Drawer, makeStyles, Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useCallback, useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { TabPanel, TabPanelsProvider } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ManagerReviewPageQuery } from './__generated__/ManagerReviewPageQuery.graphql';
import { ManagerReviewMembersList } from './ManagerReviewMembersList';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function ManagerReviewPage(props: Props) {
  const classes = useStyles(props);
  const [tab, setTab] = useState(0);

  // Todo: handle selected-user-id

  const handleOnUserClick = useCallback((id: string | null) => {
    // Todo: set selected-user-id
  }, []);

  const handleTabChange = useCallback((event: React.ChangeEvent<{}>, value: any) => {
    setTab(value);
  }, []);

  const data = useLazyLoadQuery<ManagerReviewPageQuery>(query, {});

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Overlayscrollbars className={classes.overlayscrollbars}>
          <ManagerReviewMembersList
            personReviews={data.viewer.personReviews}
            projectReviews={data.viewer.projectReviews}
            onClick={handleOnUserClick}
          />
        </Overlayscrollbars>
      </Drawer>
      <div className={classes.content}>
        <Container maxWidth="md">
          <Box marginY={5}>
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
                  {/*Add dominant characteristics component here*/}
                  {i18n._('Dominant Characteristics')}
                </TabPanel>
                <TabPanel value={2}>
                  {/*Add achievements component here*/}
                  {i18n._('Achievements')}
                </TabPanel>
              </TabPanelsProvider>
            </Paper>
          </Box>
        </Container>
      </div>
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
  drawerPaper: {
    top: 72,
    width: 192,
  } as CSSProperties,
  overlayscrollbars: {
    height: 'calc(100% - 72px)',
  } as CSSProperties,
  content: {
    paddingLeft: 192,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ManagerReviewPage' });
type StyleProps = Styles<typeof styles>;

const query = graphql`
  query ManagerReviewPageQuery {
    viewer {
      personReviews {
        ...ManagerReviewMembersList_personReviews
      }
      projectReviews {
        ...ManagerReviewMembersList_projectReviews
      }
    }
  }
`;
