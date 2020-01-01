// @ts-ignore
import React, { Ref, useTransition } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

// React 15 compat
const forwardRefShim = (C: any) => C;
let { forwardRef } = React;
if (typeof React.forwardRef === 'undefined') {
  forwardRef = forwardRefShim;
}

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface OwnProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  innerRef: Ref<any>;
  navigate: () => void;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

type Props = FCProps<OwnProps>;

export const LinkAnchor = forwardRef((props: Props, forwardedRef) => {
  const {
    innerRef, // TODO: deprecate
    navigate,
    onClick,
    ...rest
  } = props;

  const { target } = rest;

  // we enclose navigate function with startTransition, because navigate triggers a user-blocking update that will be suspended
  const [startTransition] = useTransition({ timeoutMs: 300 });

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    try {
      if (onClick) onClick(event);
    } catch (ex) {
      event.preventDefault();
      throw ex;
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      (!target || target === '_self') && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      startTransition(() => {
        navigate();
      });
    }
  };

  let ref: Ref<any>;

  // React 15 compat
  if (forwardRefShim !== forwardRef) {
    ref = forwardedRef || innerRef;
  } else {
    ref = innerRef;
  }

  /* eslint-disable-next-line jsx-a11y/anchor-has-content */
  return <a {...rest} onClick={handleClick} ref={ref} />;
});
