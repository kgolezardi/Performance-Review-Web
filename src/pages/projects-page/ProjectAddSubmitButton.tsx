import * as React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { FragmentLens } from 'src/shared/forminator/core/fragment-lens/FragmentLens';
import { useFragmentContext } from 'src/shared/forminator/core/fragment/FragmentContext';
import { useSubmitContext } from 'src/shared/forminator/core/submit/SubmitContext';

interface OwnProps<V> extends ButtonProps {
  lens: FragmentLens<V>;
}

type Props<V> = React.PropsWithChildren<OwnProps<V>>;

export function ProjectAddSubmitButton<V>(props: Props<V>) {
  const { lens, ...restProps } = props;
  const onSubmit = useSubmitContext();
  const fragment = useFragmentContext();

  const handleSubmit = async () => {
    await onSubmit();
    lens.getSubStore()?.store.getValueSubscribable(fragment).setValue('');
  };

  return <Button {...restProps} onClick={handleSubmit} />;
}
