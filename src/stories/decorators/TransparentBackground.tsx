import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

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
