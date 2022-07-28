import { useMDXPropsContext } from 'src/shared/mdx-provider/MDXPropsProvider';
import { getUserLabel, UserType } from 'src/shared/utils/getUserLabel';

export function Username() {
  const user = useMDXPropsContext<UserType | null>();
  return user ? getUserLabel(user, { short: true }) : '';
}
