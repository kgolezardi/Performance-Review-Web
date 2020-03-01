import GiftDialogHeader from 'src/assets/gift-dialog-elements.png';
import GiftInCircle from 'src/assets/gift-in-cirlce.png';
import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  Theme,
  Typography,
  makeStyles,
  styled,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';

interface OwnProps {
  open: boolean;
  onRecieveClick: () => void;
  onLaterClick: () => void;
}

type Props = FCProps<OwnProps> & StyleProps;

export function GiftDialog(props: Props) {
  const { open, onRecieveClick, onLaterClick } = props;
  const classes = useStyles(props);

  const handleRecieveClick = useCallback(() => {
    onRecieveClick();
  }, [onRecieveClick]);

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
        {/* TODO: use MDX */}
        خسته نباشی. شما بصورت کامل ارزیابی‌ها رو انجام دادی. تا قبل از پایان مهلت ارزیابی‌ها، هر وقت تمایل داشتی می‌تونی
        به ارزیابی هر کدوم از همکارانت که خواستی مراجعه و اون رو ویرایش کنی. برای رفع خستگی یه جایزه در نظر گرفتیم که
        تقدیمت می‌کنیم.
        <br />
        امیدواریم خوشت بیاد.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRecieveClick} variant="contained" color="primary">
          {i18n._('Recieve the gift')}
        </Button>
        <Button onClick={handleLaterClick}>{i18n._('Thanks, I take it later')}</Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = (theme: Theme) => ({
  dialogPaper: {
    overflowY: 'visible',
    width: 512,
  } as CSSProperties,
  giftInCirlceImage: {
    width: 168,
    height: 168,
    position: 'absolute',
    top: 0,
    right: '50%',
    transform: 'translate(50%,-50%)',
  } as CSSProperties,
  headerImage: {
    width: '100%',
  } as CSSProperties,
  dialogTitle: {
    textAlign: 'center',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'GiftDialog' });
type StyleProps = Styles<typeof styles>;

const DialogActions = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'grid',
  placeItems: 'center',
  gridGap: theme.spacing(),
  padding: theme.spacing(2),
}));
