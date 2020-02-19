import { makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { Fragment, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { InViewContextProvider } from 'src/shared/in-view/InViewContext';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function InView(props: Props) {
  const { children } = props;
  const classes = useStyles(props);
  const [topRef, topInView] = useInView();
  const [bottomRef, bottomInView] = useInView();

  const contextValue = useMemo(() => ({ topInView, bottomInView }), [topInView, bottomInView]);

  return (
    <Fragment>
      <div ref={topRef} className={classes.inViewSpy} />
      <InViewContextProvider value={contextValue}>{children}</InViewContextProvider>
      <div ref={bottomRef} className={classes.inViewSpy} />
    </Fragment>
  );
}

const styles = (theme: Theme) => ({
  inViewSpy: {
    height: 1,
    width: '100%',
    backgroundColor: 'transparent',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'InView' });
type StyleProps = Styles<typeof styles>;
