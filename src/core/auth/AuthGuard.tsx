import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { AuthPage } from 'src/shared/auth';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { AuthGuardQuery } from './__generated__/AuthGuardQuery.graphql';
import { User } from './User';
import { UserContext } from './UserContext';

const query = graphql`
  query AuthGuardQuery {
    viewer {
      me {
        username
        firstName
        lastName
        avatarUrl
        id
        isManager
        hasStarted
        ranking1
        ranking2
        ...getUserLabel_user
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AuthGuard(props: Props) {
  const data = useLazyLoadQuery<AuthGuardQuery>(query, {});
  const me = data.viewer.me;

  if (me) {
    const context: User = {
      ...me,
      shortUserLabel: getUserLabel(me, { short: true }),
      userLabel: getUserLabel(me),
    };
    return <UserContext.Provider value={context}>{props.children}</UserContext.Provider>;
  } else {
    return <AuthPage />;
  }
}
