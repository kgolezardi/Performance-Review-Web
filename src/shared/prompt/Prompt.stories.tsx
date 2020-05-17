import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routerDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLocation } from 'react-router';

import { Prompt } from './Prompt';
import { PromptProvider, usePrompt } from './PromptProvider';

const Links = () => {
  const location = useLocation();
  return (
    <div>
      <Link to="/one">link 1</Link> <Link to="/two">link 2</Link>
      <br />
      pathname: {location.pathname}
    </div>
  );
};

const PromptButton = (props: { id: string }) => {
  const [when, setWhen] = useState(true);
  usePrompt(props.id, when);
  return (
    <div>
      <button
        onClick={() => {
          setWhen((w) => !w);
        }}
      >
        toggle
      </button>
      when: {when + ''}
    </div>
  );
};

storiesOf('Prompt', module)
  .addDecorator(
    routerDecorator({
      initialEntries: ['/one', '/two', { pathname: '/three' }],
      initialIndex: 1,
      getUserConfirmation: (message) => {
        window.confirm(message);
      },
    }),
  )
  .add('true', () => (
    <div>
      <Prompt message="where are you going?" when={true} />
      <Links />
    </div>
  ))
  .add('false', () => (
    <div>
      <Prompt message="where are you going?" when={false} />
      <Links />
    </div>
  ))
  .add('dynamic', () => {
    const [when, setWhen] = useState(true);
    return (
      <div>
        <button
          onClick={() => {
            setWhen((w) => !w);
          }}
        >
          toggle
        </button>
        when: {when + ''}
        <Prompt message="where are you going?" when={when} />
        <Links />
      </div>
    );
  })
  .add('provider', () => (
    <div>
      <PromptProvider message="where are you going?">
        <PromptButton id="a" />
        <PromptButton id="b" />
      </PromptProvider>
      <Links />
    </div>
  ));
