import PrintIcon from '@material-ui/icons/Print';
import clsx from 'clsx';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Fab, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

const iframeId = 'print-manager-review';

interface OwnProps {
  uid?: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewPrintButton(props: Props) {
  const { uid } = props;
  const classes = useStyles(props);

  const [show, setShow] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleClick = () => {
    if (show) {
      iframeRef.current?.contentWindow?.focus();
      iframeRef.current?.contentWindow?.print();
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.action === iframeId) {
        setShow(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <Fragment>
      <iframe
        ref={iframeRef}
        id={iframeId}
        src={'/print-manager-review/' + uid}
        className={classes.noDisplay}
        title="Print Manager Review"
      />
      <Fab onClick={handleClick} color="primary" className={clsx(classes.fab, { [classes.noDisplay]: !show })}>
        <PrintIcon />
      </Fab>
    </Fragment>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    noDisplay: {
      display: 'none',
    },
    fab: {
      position: 'fixed',
      bottom: 48,
      left: 40,
      zIndex: theme.zIndex.snackbar - 10,
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewPrintButton' });
type StyleProps = Styles<typeof styles>;
