import { Box, Container, Drawer, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment, useCallback } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ManagerReviewPageQuery } from './__generated__/ManagerReviewPageQuery.graphql';
import { ManagerReviewContent } from './ManagerReviewContent';
import { ManagerReviewMembersList } from './ManagerReviewMembersList';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function ManagerReviewPage(props: Props) {
  const classes = useStyles(props);

  // Todo: handle selected-user-id

  const handleOnUserClick = useCallback((id: string | null) => {
    // Todo: set selected-user-id
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
            <ManagerReviewContent />
          </Box>
        </Container>
      </div>
    </Fragment>
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
        ...ManagerReviewMembersList_personReviews
      }
      projectReviews {
        ...ManagerReviewMembersList_projectReviews
      }
    }
  }
`;
