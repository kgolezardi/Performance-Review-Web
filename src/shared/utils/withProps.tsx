import React, { ComponentProps, ComponentType, PropsWithChildren } from 'react';

export function withProps<C extends ComponentType<PropsWithChildren<{}>>, P extends Partial<ComponentProps<C>>>(
  BaseComponent: C,
  extraProps: P,
): ComponentType<PropsWithChildren<P>> {
  return (props: any) => <BaseComponent {...props} {...extraProps} />;
}
