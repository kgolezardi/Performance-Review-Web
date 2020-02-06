import React from 'react';

export interface LinkType {
  to: string;
}
export interface MenuItem {
  text: React.ReactNode;
  link: LinkType;
}
