import { useMDXPropsContext } from 'src/shared/mdx-provider/MDXPropsProvider';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { CriteriaForm_userNode } from './__generated__/CriteriaForm_userNode.graphql';

export function Username() {
  const user = useMDXPropsContext<CriteriaForm_userNode | null>();
  return user ? getUserLabel(user) : '';
}
