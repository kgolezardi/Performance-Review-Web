import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { SelectMultiAutoComplete } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { ReviewersInput_Reviewers$key } from './__generated__/ReviewersInput_Reviewers.graphql';

interface OwnProps {
  label: string;
  initialValue?: string[];
  users: ReviewersInput_Reviewers$key;
  excludes?: string[];
}

interface Option {
  value: string;
  label: string;
}

type Props = FCProps<OwnProps>;

export function ReviewersInput(props: Props) {
  const { label, initialValue, excludes } = props;
  const users = useFragment(
    graphql`
      fragment ReviewersInput_Reviewers on UserNode @relay(plural: true) {
        id
        firstName
        lastName
        username
      }
    `,
    props.users,
  );
  const options: Option[] = users.map(user => ({
    value: user.id,
    label: getUserLabel(user),
  }));

  return (
    <SelectMultiAutoComplete
      excludes={excludes}
      filterSelectedOptions
      label={label}
      options={options}
      initialValue={initialValue}
    />
  );
}

export type ReviewersInputProps = OwnProps;
