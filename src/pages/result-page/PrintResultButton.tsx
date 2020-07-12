import PrintIcon from '@material-ui/icons/Print';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Fab, Theme, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

const iframeId = 'print-result';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function PrintResultButton(props: Props) {
  const classes = useStyles(props);

  const [disabled, setDisabled] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleClick = () => {
    if (!disabled) {
      iframeRef.current?.contentWindow?.focus();
      iframeRef.current?.contentWindow?.print();
    }
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.data.action === iframeId) {
      setDisabled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <Fragment>
      <iframe ref={iframeRef} id={iframeId} src="/print" className={classes.iframe} title="Print Result" />
      <Fab onClick={handleClick} disabled={disabled} color="primary" className={classes.fab}>
        <PrintIcon />
      </Fab>
    </Fragment>
  );
}

const styles = (theme: Theme) => ({
  iframe: {
    display: 'none',
  } as CSSProperties,
  fab: {
    position: 'fixed',
    bottom: 48,
    left: 40,
    zIndex: theme.zIndex.snackbar - 10,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ResultPage' });
type StyleProps = Styles<typeof styles>;
