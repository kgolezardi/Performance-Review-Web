import React, { ComponentType, ReactNode } from 'react';

/**
 * get react children and return map from `child.type` to `child.props.children`
 * @param children react children
 * @param components list of available children. children with other types will be ignored.
 */
export function groupChildrenByType(
  children: ReactNode,
  components: Array<string | ComponentType>,
): Map<string | ComponentType, ReactNode> {
  const componentsSet = new Set(components);
  const map = new Map();
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<{ children?: ReactNode }>(child)) {
      if (componentsSet.has(child.type)) {
        map.set(child.type, child.props.children);
      }
    }
  });
  return map;
}
