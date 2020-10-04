import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { CriteriaResult } from 'src/shared/criteria-result';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { importMDX } from 'mdx.macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { CriteriaResultPageQuery } from './__generated__/CriteriaResultPageQuery.graphql';

const DescriptionCriteriaResultPage = importMDX.sync('./DescriptionCriteriaResultPage.mdx');

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query CriteriaResultPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...CriteriaResult_reviews
        }
      }
    }
  }
`;

export default function CriteriaResultPage(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<CriteriaResultPageQuery>(query, { id: revieweeId });
  const components = useContext(MDXContext);

  const reviews = data.viewer.user?.personReviews;
  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <SectionGuide>
        <DescriptionCriteriaResultPage components={components} />
      </SectionGuide>
      <CriteriaResult reviews={reviews} />
    </Box>
  );
}
