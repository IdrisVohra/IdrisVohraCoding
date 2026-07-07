import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: { layout: "centered" },
  args: {
    label: "Email address",
    placeholder: "you@example.com",
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Required: Story = { args: { required: true } };

export const WithDescription: Story = {
  args: { description: "We'll never share your email." },
};

export const WithError: Story = {
  args: { error: "Please enter a valid email address.", defaultValue: "not-an-email" },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "readonly@example.com" } };
