import { MockResolvers } from 'relay-test-utils/lib/RelayMockPayloadGenerator';

import { userNodes } from './data/UserNode';

export const UserNodeResolver = (): MockResolvers => ({
  UserNode: (context, generateId) => {
    return userNodes[0];
  },
});
