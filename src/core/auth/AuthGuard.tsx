import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useLazyLoadQuery, useFragment } from 'react-relay/hooks';
import { AuthPage } from 'src/shared/auth';
import { FCProps } from 'src/shared/types/FCProps';
import { UserContext } from './UserContext';
import { AuthGuardQuery } from './__generated__/AuthGuardQuery.graphql';
import { AuthGuard_user$key } from './__generated__/AuthGuard_user.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AuthGuard(props: Props) {
  const data = useLazyLoadQuery<AuthGuardQuery>(authGuardQuery, {});
  const me = useFragment<AuthGuard_user$key>(fragment, data.viewer.me);

  const user = useMemo(
    () =>
      me
        ? {
            username: me.username,
            id: me.id,
            firstName: me.firstName,
            lastName: me.lastName,
            hasStarted: me.hasStarted || false,
            isManager: me.isManager,
          }
        : null,
    [me],
  );

  if (user) {
    return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
  } else {
    return <AuthPage />;
  }
}
// TODO: add auth-guard-fragment and use it in logout, login
const authGuardQuery = graphql`
  query AuthGuardQuery {
    viewer {
      me {
        ...AuthGuard_user
      }
    }
  }
`;

const fragment = graphql`
  fragment AuthGuard_user on UserNode {
    id
    username
    firstName
    lastName
    hasStarted
    isManager
  }
`;
