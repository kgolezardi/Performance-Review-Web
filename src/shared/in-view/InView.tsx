import React, { Fragment, useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { useInView } from 'react-intersection-observer';

import { InViewContextProvider } from './InViewContext';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function InView(props: Props) {
  const { children } = props;
  const classes = useStyles(props);
  const [topRef, topInView] = useInView({ initialInView: true });
  const [bottomRef, bottomInView] = useInView({ initialInView: true });

  const contextValue = useMemo(() => ({ topInView, bottomInView }), [topInView, bottomInView]);

  return (
    <Fragment>
      <div ref={topRef} className={classes.inViewSpy} />
      <InViewContextProvider value={contextValue}>{children}</InViewContextProvider>
      <div ref={bottomRef} className={classes.inViewSpy} />
    </Fragment>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    inViewSpy: {
      height: 1,
      width: '100%',
      backgroundColor: 'transparent',
    },
  });

const useStyles = makeStyles(styles, { name: 'InView' });
type StyleProps = Styles<typeof styles>;
