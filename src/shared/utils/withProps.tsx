import React, { ComponentProps, ComponentType } from 'react';

export function withProps<
  C extends ComponentType<{ children?: React.ReactNode }>,
  P extends { children: React.ReactNode }
>(BaseComponent: C, extraProps: Partial<ComponentProps<C>>): ComponentType<{ children: React.ReactNode }> {
  return ((props: any) => <BaseComponent {...extraProps} {...props} />) as any;
}
