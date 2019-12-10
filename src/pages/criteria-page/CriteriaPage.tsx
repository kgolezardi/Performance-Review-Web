import { Container } from '@material-ui/core';
import React, { useCallback } from 'react';
import { CriteriaForm } from 'src/pages/criteria-page/CriteriaForm';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function CriteriaPage(props: Props) {
  const handleSubmit = useCallback(() => {
    // FIXME: use mutation here
    console.log('Submit');
  }, []);

  return (
    <Container>
      <CriteriaForm onSubmit={handleSubmit} />
    </Container>
  );
}
