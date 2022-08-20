import { UserType, getUserLabel } from 'src/shared/utils/getUserLabel';
import { useMDXPropsContext } from 'src/shared/mdx-provider/MDXPropsProvider';

export function ShortUsername() {
  const user = useMDXPropsContext<UserType | null>();
  return user ? getUserLabel(user, { short: true }) : '';
}
