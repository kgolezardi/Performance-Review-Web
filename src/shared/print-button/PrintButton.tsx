import PrintIcon from '@material-ui/icons/Print';
import clsx from 'clsx';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { CircularProgress, Fab, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  printSrc: string;
  id: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PrintButton(props: Props) {
  const { printSrc, id } = props;
  const classes = useStyles(props);

  const [startPrinting, setStartPrinting] = React.useState(false);

  const [show, setShow] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleClick = () => {
    setStartPrinting(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === id) {
        timer = setTimeout(() => setShow(true), 2000);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, [id]);

  useEffect(() => {
    if (show) {
      iframeRef.current?.contentWindow?.focus();
      iframeRef.current?.contentWindow?.print();
      setStartPrinting(false);
      setShow(false);
    }
  }, [show]);

  return (
    <Fragment>
      {startPrinting && (
        <iframe ref={iframeRef} id={id} src={printSrc} className={classes.noDisplay} title="Print Page" />
      )}
      <Fab onClick={handleClick} color="primary" className={clsx(classes.fab)}>
        {startPrinting ? <CircularProgress color="inherit" /> : <PrintIcon />}
      </Fab>
    </Fragment>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    noDisplay: {
      visibility: 'hidden',
      opacity: 0,
      position: 'absolute',
      top: 0,
      width: 0,
      height: 0,
      left: 0,
    },
    fab: {
      position: 'fixed',
      bottom: 48,
      left: 40,
      zIndex: theme.zIndex.snackbar - 10,
    },
  });

const useStyles = makeStyles(styles, { name: 'PrintButton' });
type StyleProps = Styles<typeof styles>;
