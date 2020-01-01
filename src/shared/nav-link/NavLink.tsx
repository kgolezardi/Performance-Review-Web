import React from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { LinkAnchor } from './LinkAnchor';

interface OwnProps extends NavLinkProps {}

type Props = FCProps<OwnProps>;

export function NavLink(props: Props) {
  return <RouterNavLink {...props} component={LinkAnchor} />;
}
