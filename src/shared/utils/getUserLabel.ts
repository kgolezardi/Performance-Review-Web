import graphql from 'babel-plugin-relay/macro';
import { readInlineData } from 'relay-runtime';

import { getUserLabel_user, getUserLabel_user$key } from './__generated__/getUserLabel_user.graphql';

interface GetLabelOptions {
  short?: boolean;
}
const fragment = graphql`
  fragment getUserLabel_user on UserNode @inline {
    firstName
    lastName
    username
  }
`;
export type UserType = getUserLabel_user$key;

export const getUserLabel = (user: UserType, options: GetLabelOptions = {}) => {
  const { short = false } = options;
  const userValue = readInlineData<getUserLabel_user>(fragment, user);
  if (short) {
    return userValue.firstName.trim() || userValue.lastName.trim() || userValue.username.trim();
  }
  const name = (userValue.firstName + ' ' + userValue.lastName).trim();
  return name || userValue.username;
};
