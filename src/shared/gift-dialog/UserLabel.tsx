import React from 'react';
import { Typography as MuiTypography } from '@material-ui/core';
import { UserType, getUserLabel } from 'src/shared/utils/getUserLabel';
import { useMDXPropsContext } from 'src/shared/mdx-provider/MDXPropsProvider';

import { withProps } from '../utils/withProps';

export function UserLabel() {
  const user = useMDXPropsContext<UserType | null>();
  const userLabel = user && getUserLabel(user, { short: true });

  // TODO: handle this better
  return <Typography>{userLabel + ' عزیز'}</Typography>;
}

const Typography = withProps(MuiTypography, {
  variant: 'body1',
  gutterBottom: true,
  style: { textAlign: 'center', lineHeight: '1.5em' },
});
