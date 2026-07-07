import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  args: {
    label: "Message",
    placeholder: "Type your message...",
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: "Max 500 characters." },
};

export const WithError: Story = {
  args: { error: "Message is required." },
};
