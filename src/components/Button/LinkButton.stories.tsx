import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LinkButton } from './LinkButton';

export default {
  title: 'LinkButton',
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>;

export const SamePageLink: ComponentStory<typeof LinkButton> = () => (
  <LinkButton href='https://satyambnsal.com'>click me baby!</LinkButton>
);
