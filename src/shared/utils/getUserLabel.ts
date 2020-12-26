import graphql from 'babel-plugin-relay/macro';
import { readInlineData } from 'relay-runtime';

import { getUserLabel_user, getUserLabel_user$key } from './__generated__/getUserLabel_user.graphql';

interface GetLabelOptions {
  short?: boolean;
}

// TODO: Remove fragment?
const fragment = graphql`
  fragment getUserLabel_user on UserNode @inline {
    firstName
    lastName
    username
  }
`;

export const getUserLabel = (userRef: getUserLabel_user$key, options: GetLabelOptions = {}) => {
  const { short = false } = options;

  const user = readInlineData<getUserLabel_user>(fragment, userRef);

  if (short) {
    return user.firstName.trim() || user.lastName.trim() || user.username.trim();
  }

  const name = (user.firstName + ' ' + user.lastName).trim();
  return name || user.username;
};
