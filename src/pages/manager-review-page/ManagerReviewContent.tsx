import { i18n } from '@lingui/core';
import { Paper, Tab, Tabs, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React, { Fragment, useCallback, useState } from 'react';
import { TabPanel, TabPanelsProvider } from 'src/shared/tab';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { useMemberListContext } from '../../shared/members-list';
import { useDominantCharacteristics_projectReviews$key } from './__generated__/useDominantCharacteristics_projectReviews.graphql';
import { DominantCharacteristicsManagerReview } from './DominantCharacteristics';
import { useDominantCharacteristics } from './useDominantCharacteristics';

interface OwnProps {
  personReviews: useDominantCharacteristics_projectReviews$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewContent(props: Props) {
  const { personReviews } = props;
  const classes = useStyles(props);
  const [tab, setTab] = useState(0);

  const handleTabChange = useCallback((event: React.ChangeEvent<{}>, value: any) => {
    setTab(value);
  }, []);

  const { selectedId } = useMemberListContext();

  const currentDominantCharacteristics = useDominantCharacteristics(personReviews, selectedId);

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
