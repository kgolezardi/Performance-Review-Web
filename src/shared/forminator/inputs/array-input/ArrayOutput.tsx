import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { ForminatorFragment } from '../../core/fragment/ForminatorFragment';
import FragmentProvider from '../../core/fragment/FragmentProvider';
import { useFragmentValue } from '../../core/utils/useFragmentValue';

interface OwnProps {}

type Props = FCProps<OwnProps>;

function ArrayOutput<V>(props: Props) {
  const fragments = useFragmentValue<Array<ForminatorFragment<V>>>();
  if (fragments === undefined) {
    return null;
  }
  return (
    <Fragment>
      {fragments.map(fragment => (
        <FragmentProvider value={fragment} key={fragment.id}>
          {props.children}
        </FragmentProvider>
      ))}
    </Fragment>
  );
}

export default ArrayOutput;
