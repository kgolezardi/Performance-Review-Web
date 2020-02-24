import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { useFragment } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectCommentOutput } from './ProjectCommentOutput';
import { ProjectCommentsOutput_comments$key } from './__generated__/ProjectCommentsOutput_comments.graphql';

interface OwnProps {
  comments: ProjectCommentsOutput_comments$key;
}

type Props = FCProps<OwnProps>;

export function ProjectCommentsOutput(props: Props) {
  const comments = useFragment(fragment, props.comments);

  return (
    <Fragment>
      {comments.map(comment => (
        <ProjectCommentOutput comment={comment} key={comment.id} />
      ))}
    </Fragment>
  );
}

const fragment = graphql`
  fragment ProjectCommentsOutput_comments on ProjectCommentNode @relay(plural: true) {
    id
    ...ProjectCommentOutput_comment
  }
`;
