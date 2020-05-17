import { RequestParameters, Variables } from 'relay-runtime';

import { GRAPHQL_API } from './constants';

export function fetchQuery(operation: RequestParameters, variables: Variables = {}) {
  return fetch(GRAPHQL_API, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}
