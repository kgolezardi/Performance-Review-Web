import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { SelectAutoComplete } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectInput_projects$key } from './__generated__/ProjectInput_projects.graphql';

interface OwnProps {
  label: string;
  initialValue?: string | null;
  projects: ProjectInput_projects$key;
  blackList?: string[];
}

interface Option {
  value: string;
  label: string;
}

type Props = FCProps<OwnProps>;

export function ProjectInput(props: Props) {
  const { label, initialValue = null, blackList } = props;
  const projects = useFragment(
    graphql`
      fragment ProjectInput_projects on ProjectNode @relay(plural: true) {
        id
        name
      }
    `,
    props.projects,
  );
  const options: Option[] = projects.map(project => ({
    value: project.id,
    label: project.name,
  }));
  return <SelectAutoComplete blackList={blackList} label={label} options={options} initialValue={initialValue} />;
}

export type ProjectInputProps = Props;
