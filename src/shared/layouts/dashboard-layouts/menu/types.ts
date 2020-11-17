import React from 'react';

export interface LinkType {
  to: string;
  exact?: boolean;
  strict?: boolean;
}

interface LinkItem {
  text: React.ReactNode;
  link: LinkType;
}
export interface NavbarMenuItem extends LinkItem {
  children?: ReadonlyArray<LinkItem>;
}
