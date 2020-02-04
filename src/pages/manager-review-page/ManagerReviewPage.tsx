import { Box, Container, Drawer, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { MemberListContextProvider, MembersList } from 'src/shared/members-list';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ManagerReviewPageQuery } from './__generated__/ManagerReviewPageQuery.graphql';
import { ManagerReviewContent } from './ManagerReviewContent';
import { useMembers } from './useMembers';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function ManagerReviewPage(props: Props) {
  const classes = useStyles(props);

  const data = useLazyLoadQuery<ManagerReviewPageQuery>(query, {});

  const members = useMembers(data.viewer.projectReviews, data.viewer.personReviews);

  return (
    <MemberListContextProvider>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Overlayscrollbars className={classes.overlayscrollbars}>
          <MembersList members={members} />
        </Overlayscrollbars>
      </Drawer>
      <div className={classes.content}>
        <Container maxWidth="md">
          <Box marginY={5}>
            <ManagerReviewContent
              personReviews={data.viewer.personReviews}
              projectReviews={data.viewer.projectReviews}
            />
          </Box>
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

const query = graphql`
  query ManagerReviewPageQuery {
    viewer {
      personReviews {
        ...useMembers_personReviews
        ...ManagerReviewContent_personReviews
      }
      projectReviews {
        ...useMembers_projectReviews
        ...ManagerReviewContent_projectReviews
      }
    }
  }
`;
