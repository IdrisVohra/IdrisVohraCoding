import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  args: { name: "Ada Lovelace" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    status: { control: "select", options: [undefined, "online", "offline", "busy", "away"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {};

export const WithImage: Story = {
  args: {
    name: "Grace Hopper",
    src: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop",
  },
};

export const WithStatus: Story = {
  args: { status: "online" },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      {["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson"].map((name, i) => (
        <div key={name} style={{ marginLeft: i === 0 ? 0 : -12 }}>
          <Avatar name={name} size="md" />
        </div>
      ))}
    </div>
  ),
};
