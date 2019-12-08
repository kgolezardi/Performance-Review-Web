import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

export const StoryDummy = (props: { storyFn: StoryFn<StoryFnReactReturnType> }) => {
  return props.storyFn();
};
