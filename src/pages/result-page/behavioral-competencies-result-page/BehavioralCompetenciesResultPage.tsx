import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { BehavioralCompetenciesResult } from 'src/shared/behavioral-competencies-result';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { importMDX } from 'mdx.macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { BehavioralCompetenciesResultPageQuery } from './__generated__/BehavioralCompetenciesResultPageQuery.graphql';

const BehavioralCompetenciesResultPageDescription = importMDX.sync('./BehavioralCompetenciesResultPageDescription.mdx');

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query BehavioralCompetenciesResultPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...BehavioralCompetenciesResult_reviews
        }
      }
    }
  }
`;

export default function BehavioralCompetenciesResultPage(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<BehavioralCompetenciesResultPageQuery>(query, { id: revieweeId });
  const components = useContext(MDXContext);

  const reviews = data.viewer.user?.personReviews;
  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <SectionGuide>
        <BehavioralCompetenciesResultPageDescription components={components} />
      </SectionGuide>
      <BehavioralCompetenciesResult reviews={reviews} />
    </Box>
  );
}
