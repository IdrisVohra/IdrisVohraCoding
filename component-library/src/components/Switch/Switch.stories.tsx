import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  args: { label: "Enable notifications" },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Switch {...args} />
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Switch {...args} />
    </div>
  ),
};

export const WithDescription: Story = {
  args: { description: "Get an email whenever someone mentions you." },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Switch {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Switch {...args} />
    </div>
  ),
};
