import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routerDecorator } from 'src/stories/decorators';
import { Prompt } from './Prompt';
import { useLocation } from 'react-router';
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

storiesOf('Prompt', module)
  .addDecorator(
    routerDecorator({
      initialEntries: ['/one', '/two', { pathname: '/three' }],
      initialIndex: 1,
      getUserConfirmation: message => {
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
            setWhen(w => !w);
          }}
        >
          toggle
        </button>
        when: {when + ''}
        <Prompt message="where are you going?" when={when} />
        <Links />
      </div>
    );
  });
