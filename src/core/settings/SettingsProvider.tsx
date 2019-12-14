import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { SettingsContext } from './SettingsContext';
import { SettingsProviderQuery } from './__generated__/SettingsProviderQuery.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function SettingsProvider(props: Props) {
  const data = useLazyLoadQuery<SettingsProviderQuery>(query, {});
  const { settings } = data.viewer;
  const value = useMemo(
    () => ({
      selfAssessment: settings.selfAssessment,
      peerReviews: settings.peerReviews,
      managerReviews: settings.managerReviews,
      calibration: settings.calibration,
      result: settings.result,
    }),
    [settings],
  );
  return <SettingsContext.Provider value={value}>{props.children}</SettingsContext.Provider>;
}

const query = graphql`
  query SettingsProviderQuery {
    viewer {
      settings {
        selfAssessment
        peerReviews
        managerReviews
        calibration
        result
      }
    }
  }
`;
