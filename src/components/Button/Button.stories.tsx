import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  onClick: () => {
    console.log('primay button clicked');
  },
  children: 'Primary button',
};

export const Secondary = Template.bind({});

Secondary.args = {
  primary: false,
  onClick: () => {
    console.log('secondary button clicked');
  },
  children: 'Secondary button',
};
