import { i18n } from '@lingui/core';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useCallback, useContext, useState } from 'react';
import GiftDialogHeader from 'src/assets/gift-dialog-elements.png';
import GiftInCircle from 'src/assets/gift-in-cirlce.png';
import { useAuthGuardUser } from 'src/core/auth';
import { ReacteroidsPortal } from 'src/shared/reacteroids';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';

const Content = importMDX.sync('./NoPeerReviewContent.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function NoPeerReviewPage(props: Props) {
  const classes = useStyles(props);
  const user = useAuthGuardUser();
  const components = useContext(MDXContext);

  const [showGame, setShowGame] = useState(false);

  const handleClick = useCallback(() => {
    setShowGame(true);
  }, []);

  const handleExit = useCallback(() => {
    setShowGame(false);
  }, []);

  if (showGame) {
    return <ReacteroidsPortal onExit={handleExit} />;
  }

  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <Card classes={{ root: classes.card }}>
          <img src={GiftInCircle} className={classes.giftInCirlceImage} alt="gift circle" />
          <Box padding={3} paddingBottom={5} className={classes.headerImage} />
          <CardHeader title={i18n._('Dear {name}, Hello', { name: getUserLabel(user) })} />
          <CardContent>
            <Content components={components} />
          </CardContent>
          <CardActions classes={{ root: classes.cardActions }}>
            <Button onClick={handleClick} variant="contained" color="primary">
              {i18n._('Show and claim reward')}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      position: 'relative',
      padding: theme.spacing(6),
      overflow: 'visible',
    },
    giftInCirlceImage: {
      width: 168,
      height: 168,
      position: 'absolute',
      top: 0,
      right: '50%',
      transform: 'translate(50%,-50%)',
    },
    headerImage: {
      backgroundImage: `url(${GiftDialogHeader})`,
      backgroundSize: 'contain',
      backgroundPositionX: 'center',
    },
    cardActions: {
      justifyContent: 'center',
    },
  });

const useStyles = makeStyles(styles, { name: 'NoPeerReviewPage' });
type StyleProps = Styles<typeof styles>;
