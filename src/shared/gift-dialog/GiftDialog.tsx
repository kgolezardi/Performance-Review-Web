import GiftDialogHeader from 'src/assets/gift-dialog-elements.png';
import GiftInCircle from 'src/assets/gift-in-cirlce.png';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useContext } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Theme,
  Typography,
  createStyles,
  makeStyles,
  styled,
} from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { Styles } from 'src/shared/types/Styles';
import { UserType } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useFragment } from 'react-relay/hooks';

import { GiftDialog_user$key } from './__generated__/GiftDialog_user.graphql';
import { withProps } from '../utils/withProps';

const Content = importMDX.sync('./Content.mdx');

const fragment = graphql`
  fragment GiftDialog_user on UserNode {
    id
    ...getUserLabel_user
  }
`;

interface OwnProps {
  open: boolean;
  onClaimClick: () => void;
  onLaterClick: () => void;
  user: GiftDialog_user$key | null;
}

type Props = FCProps<OwnProps> & StyleProps;

export function GiftDialog(props: Props) {
  const { open, onClaimClick, onLaterClick } = props;
  const classes = useStyles(props);
  const components = useContext(MDXContext);
  const user = useFragment(fragment, props.user);

  const handleClaimClick = useCallback(() => {
    onClaimClick();
  }, [onClaimClick]);

  const handleLaterClick = useCallback(() => {
    onLaterClick();
  }, [onLaterClick]);

  return (
    <Dialog open={open} classes={{ paper: classes.dialogPaper }}>
      <img src={GiftInCircle} className={classes.giftInCirlceImage} alt="gift circle" />
      <Box padding={3} paddingBottom={5}>
        <img src={GiftDialogHeader} className={classes.headerImage} alt="gift dialog header" />
      </Box>
      <MuiDialogTitle disableTypography classes={{ root: classes.dialogTitle }}>
        <Typography variant="h5">{i18n._('All reviews were successfully done')}</Typography>
      </MuiDialogTitle>
      <DialogContent>
        <MDXPropsProvider<UserType | null> value={user}>
          <Content components={{ ...components, p: PTypography }} />
        </MDXPropsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClaimClick} variant="contained" color="primary">
          {i18n._('Show and claim reward')}
        </Button>
        <Button onClick={handleLaterClick}>{i18n._('Thanks, I claim it later')}</Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    dialogPaper: {
      overflowY: 'visible',
      width: 512,
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
      width: '100%',
    },
    dialogTitle: {
      textAlign: 'center',
    },
  });

const useStyles = makeStyles(styles, { name: 'GiftDialog' });
type StyleProps = Styles<typeof styles>;

const DialogActions = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'grid',
  placeItems: 'center',
  gridGap: theme.spacing(),
  padding: theme.spacing(2),
}));

const PTypography = withProps(Typography, {
  variant: 'body1',
  gutterBottom: true,
  style: { textAlign: 'center', lineHeight: '1.5em' },
});
