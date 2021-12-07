import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core';
import { useEffect } from 'react';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function GlobalStyles(props: Props) {
  const theme = useTheme();

  const { direction } = theme;

  // material ui read dir attribute of body, so we should set that value
  // see more: https://github.com/mui-org/material-ui/blob/3f850eaa6d437afe86127343f0010703ed11ee85/packages/material-ui/src/Popper/Popper.js#L15
  useEffect(() => {
    document.body.setAttribute('dir', direction === 'rtl' ? 'rtl' : 'ltr');
  }, [direction]);

  useStyles(props);
  return null;
}

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      html: {},
      body: {
        direction: 'ltr', // automatically changes to `rtl` based on theme.
        overflowX: 'hidden',
        '@media print': {
          '& div': {
            // `display: flex` breaks pageBreakInside behaviour
            display: 'block !important',
          },
        },
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'GlobalStyles' });
type StyleProps = Styles<typeof styles>;
