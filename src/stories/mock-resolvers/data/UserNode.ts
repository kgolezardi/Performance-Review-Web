import graphql from 'babel-plugin-relay/macro';

import { ID, OmitRefType } from '../utils';
import { UserNode$data } from './__generated__/UserNode.graphql';

graphql`
  fragment UserNode on UserNode {
    id
    firstName
    lastName
    username
    avatarUrl
  }
`;

export type UserNode = OmitRefType<UserNode$data>;

export const userNodes: UserNode[] = [
  {
    id: ID('UserNode:1'),
    firstName: 'علی',
    lastName: 'احمدی',
    username: 'ali',
    avatarUrl: null,
  },
];
