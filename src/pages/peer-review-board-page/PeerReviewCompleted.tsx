import React from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { ReacteroidsWrapper } from 'src/shared/games';
import { i18n } from '@lingui/core';

interface OwnProps {
  onClick: () => void;
}

type Props = FCProps<OwnProps>;

export function PeerReviewCompleted(props: Props) {
  const { onClick } = props;
  // const user = useAuthGuardUser();

  return (
    <Card>
      <CardHeader title={i18n._('Dear {name}, Hello', { name: 'name' })} />
      <CardContent>
        {/* TODO: add text here */}
        No Review for you
        <Button variant="outlined" color="primary" onClick={onClick}>
          Continue Editing
        </Button>
        <ReacteroidsWrapper />
      </CardContent>
    </Card>
  );
}
