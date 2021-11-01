import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { SettingsContext } from './SettingsContext';
import { SettingsProviderQuery } from './__generated__/SettingsProviderQuery.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function SettingsProvider(props: Props) {
  const data = useLazyLoadQuery<SettingsProviderQuery>(query, {});
  const {
    settings: { phase, loginBackgroundImage, idlePageUrl, startText, lightLogoUrl, logoUrl },
  } = data.viewer;
  const value = useMemo(() => ({ phase, loginBackgroundImage, idlePageUrl, startText, lightLogoUrl, logoUrl }), [
    phase,
    loginBackgroundImage,
    idlePageUrl,
    startText,
    lightLogoUrl,
    logoUrl,
  ]);
  return <SettingsContext.Provider value={value}>{props.children}</SettingsContext.Provider>;
}

const query = graphql`
  query SettingsProviderQuery {
    viewer {
      settings {
        phase
        loginBackgroundImage
        idlePageUrl
        startText
        logoUrl
        lightLogoUrl
      }
    }
  }
`;
