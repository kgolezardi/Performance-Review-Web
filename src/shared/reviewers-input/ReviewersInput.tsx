import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { SelectMultiAutoComplete } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { ReviewersInput_Reviewers$key } from './__generated__/ReviewersInput_Reviewers.graphql';

interface OwnProps {
  label: string;
  initialValue?: string[];
  users: ReviewersInput_Reviewers$key;
  blackList?: string[];
}

interface Option {
  value: string;
  label: string;
}

type Props = FCProps<OwnProps>;

const getLabel = (user: { readonly firstName: string; readonly lastName: string; readonly username: string }) => {
  const name = (user.firstName + ' ' + user.lastName).trim();
  if (name) {
    return name;
  }
  return user.username;
};

export function ReviewersInput(props: Props) {
  const { label, initialValue, blackList } = props;
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
    label: getLabel(user),
  }));

  return (
    <SelectMultiAutoComplete
      blackList={blackList}
      filterSelectedOptions
      label={label}
      options={options}
      initialValue={initialValue}
    />
  );
}

export type ReviewersInputProps = OwnProps;
