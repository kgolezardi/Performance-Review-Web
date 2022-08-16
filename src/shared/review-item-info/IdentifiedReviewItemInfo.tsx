import React from 'react';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Theme,
  Typography,
  createStyles,
  lighten,
  makeStyles,
  styled,
} from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';

interface OwnProps {
  name?: string;
  src?: string;
  type: 'self' | 'peer' | 'manager';
}

type Props = FCProps<OwnProps> & StyleProps;

export function IdentifiedReviewItemInfo(props: Props) {
  const { children, name, src, type } = props;
  const classes = useStyles(props);
  const bgColor = type === 'manager' ? 'success.light' : undefined;

  return (
    <Box bgcolor={bgColor} clone>
      <Grid container spacing={2} className={classes.root}>
        <Grid item>
          <Avatar className={classes.avatar} src={src}>
            {name?.[0]}
          </Avatar>
        </Grid>
        <Grid item xs>
          <Box marginBottom={1}>
            <Typography variant="button">
              {name} <Typography variant="caption">{type === 'manager' && `(${i18n._('Manager')})`}</Typography>
            </Typography>
            {type === 'self' && (
              <Box marginLeft={2} display="inline-block">
                <RevieweeChip label={i18n._('Reviewee')} size="small" color="primary" />
              </Box>
            )}
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
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
