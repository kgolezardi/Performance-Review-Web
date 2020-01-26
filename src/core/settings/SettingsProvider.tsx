import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { SettingsProviderQuery } from './__generated__/SettingsProviderQuery.graphql';
import { SettingsContext } from './SettingsContext';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function SettingsProvider(props: Props) {
  const data = useLazyLoadQuery<SettingsProviderQuery>(query, {});
  const {
    settings: { phase, dueDate, loginBackgroundImage, idlePageUrl },
  } = data.viewer;
  const value = useMemo(() => ({ phase, dueDate, loginBackgroundImage, idlePageUrl }), [
    phase,
    dueDate,
    loginBackgroundImage,
    idlePageUrl,
  ]);
  return <SettingsContext.Provider value={value}>{props.children}</SettingsContext.Provider>;
}

const query = graphql`
  query SettingsProviderQuery {
    viewer {
      settings {
        phase
        dueDate
        loginBackgroundImage
        idlePageUrl
      }
    }
  }
`;
