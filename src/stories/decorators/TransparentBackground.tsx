import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function TransparentBackground(props: Props) {
  useStyles(props);
  return null;
}

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        background: 'transparent !important',
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'TransparentBody' });
type StyleProps = Styles<typeof styles>;
