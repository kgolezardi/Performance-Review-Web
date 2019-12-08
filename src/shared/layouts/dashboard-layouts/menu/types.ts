import React from 'react';

export interface LinkType {
  to: string;
  exact?: boolean;
  strict?: boolean;
}
export interface MenuItem {
  text: React.ReactNode;
  link: LinkType;
}
