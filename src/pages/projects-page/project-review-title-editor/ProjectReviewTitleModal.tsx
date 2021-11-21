import * as React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { i18n } from '@lingui/core';

import { ProjectReviewEditForm } from './ProjectReviewEditForm';
import { ProjectReviewEditForm_projectReview$key } from './__generated__/ProjectReviewEditForm_projectReview.graphql';

interface OwnProps {
  open: boolean;
  onClose?: () => void;
  projectReview: ProjectReviewEditForm_projectReview$key;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ProjectReviewTitleModal(props: Props) {
  const { onClose, open, projectReview } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{i18n._('Edit project title')}</DialogTitle>
      <ProjectReviewEditForm projectReview={projectReview} onCloseModal={onClose} />
    </Dialog>
  );
}
