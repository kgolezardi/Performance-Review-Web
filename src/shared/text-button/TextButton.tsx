import { Button, withStyles } from '@material-ui/core';

export const TextButton = withStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: theme.typography.body2.fontSize,
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      boxShadow: 'none',
    },
  },
  textPrimary: {
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}))(Button);
