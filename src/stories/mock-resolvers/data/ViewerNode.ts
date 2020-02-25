import graphql from 'babel-plugin-relay/macro';

import { ID, OmitRefType } from '../utils';
import { ViewerNode$data } from './__generated__/ViewerNode.graphql';

graphql`
  fragment ViewerNode on ViewerNode {
    id
    me {
      id
    }
  }
`;

export type ViewerNode = OmitRefType<ViewerNode$data>;

export const loggedInViewer: ViewerNode = {
  id: ID('ViewerNode:0'),
  me: { id: ID('UserNode:1') },
};
export const loggedOutViewer: ViewerNode = {
  id: ID('ViewerNode:0'),
  me: null,
};
