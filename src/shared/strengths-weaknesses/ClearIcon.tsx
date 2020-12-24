import MuiClearIcon from '@material-ui/icons/Clear';
import React, { useCallback } from 'react';
import { ArrayActionType } from 'src/shared/forminator/inputs/array-input/arrayReducer';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { SvgIconProps, Theme, createStyles, makeStyles } from '@material-ui/core';
import { useArrayContext } from 'src/shared/forminator/inputs/array-input/ArrayContext';
import { useFragmentContext } from 'src/shared/forminator/core/fragment/FragmentContext';

interface OwnProps extends Omit<SvgIconProps, 'onClick' | 'classes'> {}

type Props = FCProps<OwnProps> & StyleProps;

export function ClearIcon(props: Props) {
  const classes = useStyles(props);

  const dispatch = useArrayContext();
  const fragment = useFragmentContext();
  const handleClick = useCallback(() => {
    dispatch({ type: ArrayActionType.remove, fragment });
  }, [dispatch, fragment]);

  return <MuiClearIcon fontSize="small" {...props} onClick={handleClick} classes={{ root: classes.root }} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles(styles, { name: 'ClearIcon' });
type StyleProps = Styles<typeof styles>;
