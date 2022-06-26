import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import { BoardList, EmptyList } from 'src/shared/board-list';
import { Container, Fab, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Done as DoneIcon } from 'src/assets/icons/Done';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { GiftDialog } from 'src/shared/gift-dialog/GiftDialog';
import { GiftIcon } from 'src/assets/icons/GiftIcon';
import { InProgress as InProgressIcon } from 'src/assets/icons/InProgress';
import { ReacteroidsPortal } from 'src/shared/reacteroids';
import { Styles } from 'src/shared/types/Styles';
import { Todo as TodoIcon } from 'src/assets/icons/Todo';
import { UserCard } from 'src/shared/user-card';
import { groupBy } from 'ramda';
import { i18n } from '@lingui/core';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { useHistory, useLocation } from 'react-router-dom';

import { PeerReviewBoardPageQuery } from './__generated__/PeerReviewBoardPageQuery.graphql';
import {
  PeerReviewBoardPage_user,
  PeerReviewBoardPage_user$key,
} from './__generated__/PeerReviewBoardPage_user.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

const query = graphql`
  query PeerReviewBoardPageQuery {
    viewer {
      usersToReview {
        ...PeerReviewBoardPage_user
      }
      me {
        ...GiftDialog_user
      }
    }
  }
`;

const userFragment = graphql`
  fragment PeerReviewBoardPage_user on UserNode @relay(plural: true) {
    id
    peerPersonReview {
      state
    }
    ...UserCard_user
  }
`;

export interface LocationState {
  showDialog?: boolean;
}

type UserType = ElementType<PeerReviewBoardPage_user>;

const groupByState = groupBy<UserType>((user: UserType) => {
  return user.peerPersonReview?.state || '';
});

const generateCardList = (cardList: PeerReviewBoardPage_user) =>
  cardList.map((user: UserType) => <UserCard user={user} key={user.id} />);

export default function PeerReviewBoardPage(props: Props) {
  const classes = useStyles(props);

  const { state } = useLocation<LocationState>();
  const history = useHistory<LocationState>();
  const [showGame, setShowGame] = useState(false);

  const data = useLazyLoadQuery<PeerReviewBoardPageQuery>(query, {});
  const users = useFragment<PeerReviewBoardPage_user$key>(userFragment, data.viewer.usersToReview);
  const boards = groupByState(users);

  const handleDialogClose = useCallback(() => {
    history.replace({ state: { ...state, showDialog: false } });
  }, [history, state]);

  const handleFabClick = useCallback(() => {
    setShowGame(true);
  }, []);

  const handleClaimClick = useCallback(() => {
    setShowGame(true);
    handleDialogClose();
  }, [handleDialogClose]);

  const handleLaterClick = useCallback(() => {
    handleDialogClose();
  }, [handleDialogClose]);

  const handleExit = useCallback(() => {
    setShowGame(false);
  }, []);

  const open = state?.showDialog ?? false;
  // show fab if there is no review left in TODO and DOING section
  const showFab = !boards['TODO'] && !boards['DOING'];

  if (showGame) {
    return <ReacteroidsPortal onExit={handleExit} />;
  }

  return (
    <Container maxWidth="xl">
      <GiftDialog open={open} onClaimClick={handleClaimClick} onLaterClick={handleLaterClick} user={data.viewer.me} />
      <Grid container spacing={2}>
        <BoardList listTitle={i18n._('Todo')}>
          {boards['TODO'] ? (
            generateCardList(boards['TODO'])
          ) : (
            <EmptyList text={i18n._('Good job!')} icon={<TodoIcon />} />
          )}
        </BoardList>
        <BoardList listTitle={i18n._('In Progress')}>
          {boards['DOING'] ? (
            generateCardList(boards['DOING'])
          ) : (
            <EmptyList text={i18n._("You haven't started evaluating yet!")} icon={<InProgressIcon />} />
          )}
        </BoardList>
        <BoardList listTitle={i18n._('Done')}>
          {boards['DONE'] ? (
            generateCardList(boards['DONE'])
          ) : (
            <EmptyList text={i18n._('Add here after completing any evaluation')} icon={<DoneIcon />} />
          )}
        </BoardList>
      </Grid>
      {showFab && (
        <Fab onClick={handleFabClick} size="large" classes={{ root: classes.fab }}>
          <GiftIcon />
        </Fab>
      )}
    </Container>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: 48,
      left: 40,
      zIndex: theme.zIndex.snackbar - 10,
      backgroundImage: `linear-gradient(212deg, #ffa978, ${theme.palette.secondary.main} 85%, ${theme.palette.secondary.main} 90%)`,
    },
  });

const useStyles = makeStyles(styles, { name: 'PeerReviewBoardPage' });
type StyleProps = Styles<typeof styles>;
