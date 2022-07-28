import { i18n } from '@lingui/core';
import {
  Avatar,
  Box,
  Chip,
  createStyles,
  Grid,
  lighten,
  makeStyles,
  styled,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  name?: string;
  src?: string;
  type: 'self' | 'peer';
}

type Props = FCProps<OwnProps> & StyleProps;

export function IdentifiedReviewItemInfo(props: Props) {
  const { children, name, src, type } = props;
  const classes = useStyles(props);

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item>
        <Avatar className={classes.avatar} src={src}>
          {name?.[0]}
        </Avatar>
      </Grid>
      <Grid item xs>
        <Box marginBottom={1}>
          <Typography variant="button">{name}</Typography>
          {type === 'self' && (
            <Box marginLeft={2} display="inline-block">
              <RevieweeChip label={i18n._('Reviewee')} size="small" color="primary" />
            </Box>
          )}
        </Box>
        {children}
      </Grid>
    </Grid>
  );
}

const RevieweeChip = styled(Chip)(({ theme }: { theme: Theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.main, 0.9),
}));

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    avatar: {
      '@media print': {
        display: 'none !important',
      },
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  });

const useStyles = makeStyles(styles, { name: 'IdentifiedReviewItemInfo' });
type StyleProps = Styles<typeof styles>;
