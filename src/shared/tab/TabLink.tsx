import { Tab, TabProps } from '@material-ui/core';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends TabProps<'a', LinkProps> {}

type Props = FCProps<OwnProps>;

export function TabLink(props: Props) {
  return <Tab component={Link} {...props} />;
}
