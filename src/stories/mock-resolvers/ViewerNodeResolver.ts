import { MockResolvers } from 'relay-test-utils/lib/RelayMockPayloadGenerator';

import { loggedInViewer, loggedOutViewer } from './data/ViewerNode';

export const ViewerNodeResolver = (loggedIn = true): MockResolvers => ({
  ViewerNode: (context, generateId) => {
    return loggedIn ? loggedInViewer : loggedOutViewer;
  },
});
