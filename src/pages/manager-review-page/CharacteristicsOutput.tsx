import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { MultilineOutput } from 'src/shared/multiline-output';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { isNotNil } from 'src/shared/utils/general.util';

interface OwnProps {
  title: string;
  characteristics: ReadonlyArray<string | null> | null;
}

type Props = FCProps<OwnProps> & StyleProps;

export function CharacteristicsOutput(props: Props) {
  const { title, characteristics } = props;
  const classes = useStyles(props);
  return (
    <Box paddingTop={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
        {characteristics &&
          characteristics.filter(isNotNil).map(characteristic => (
            <Grid item xs={12}>
              <MultilineOutput value={characteristic} classes={{ root: classes.characteristic }} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

const styles = (theme: Theme) => ({
  characteristic: {
    border: '1px solid black',
    padding: theme.spacing(),
    borderRadius: theme.spacing(0.5),
    borderColor: 'rgba(0, 0, 0, 0.23)',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'CharacteristicsOutput' });
type StyleProps = Styles<typeof styles>;
