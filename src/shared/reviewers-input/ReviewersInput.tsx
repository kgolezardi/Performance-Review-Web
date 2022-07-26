import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { FormHelperText } from '@material-ui/core';
import { SelectMultiAutoComplete } from 'src/shared/forminator';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useFragment } from 'react-relay/hooks';

import { ReviewersInput_Reviewers$key } from './__generated__/ReviewersInput_Reviewers.graphql';

interface OwnProps {
  label: string;
  initialValue?: string[];
  users: ReviewersInput_Reviewers$key;
  excludes?: string[];
  helperText?: React.ReactNode;
  maximumReviewers: number;
}

interface Option {
  value: string;
  label: string;
}

type Props = FCProps<OwnProps>;

export function ReviewersInput(props: Props) {
  const { label, initialValue, excludes, helperText, maximumReviewers } = props;
  const users = useFragment(
    graphql`
      fragment ReviewersInput_Reviewers on UserNode @relay(plural: true) {
        id
        ...getUserLabel_user
      }
    `,
    props.users,
  );
  const options: Option[] = users.map((user) => ({
    value: user.id,
    label: getUserLabel(user),
  }));

  return (
    <>
      <SelectMultiAutoComplete
        excludes={excludes}
        filterSelectedOptions
        label={label}
        options={options}
        initialValue={initialValue}
        maximumValues={maximumReviewers}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
}

export type ReviewersInputProps = OwnProps;
