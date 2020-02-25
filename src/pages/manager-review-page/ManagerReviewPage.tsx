import React, { useMemo, useState } from 'react';
import { Box, Container, Drawer, Theme, Typography, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { MemberListContextProvider } from 'src/shared/members-list';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';

import { ManagerReviewContent } from './ManagerReviewContent';
import { ManagerReviewMemberList } from './ManagerReviewMemberList';
import { ManagerReviewNoUserContent } from './ManagerReviewNoUserContent';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function ManagerReviewPage(props: Props) {
  const classes = useStyles(props);
  const [userId, setUserId] = useState<string | null>(null);
  const memberListContextValue = useMemo(() => ({ userId, setUserId }), [userId]);
  return (
    <MemberListContextProvider value={memberListContextValue}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Overlayscrollbars className={classes.overlayscrollbars}>
          <Box p={2}>
            <Typography variant="h6">{i18n._('Your team members')}</Typography>
          </Box>
          <ManagerReviewMemberList />
        </Overlayscrollbars>
      </Drawer>
      <div className={classes.content}>
        <Container maxWidth="md">
          <Box marginY={5}>{userId ? <ManagerReviewContent userId={userId} /> : <ManagerReviewNoUserContent />}</Box>
        </Container>
      </div>
    </MemberListContextProvider>
  );
}

const styles = (theme: Theme) => ({
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
