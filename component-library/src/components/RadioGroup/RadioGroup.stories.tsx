import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const planOptions = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise", disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  args: {
    label: "Plan",
    name: "plan",
    options: planOptions,
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = { args: { defaultValue: "free" } };

export const Horizontal: Story = {
  args: { defaultValue: "free", orientation: "horizontal" },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("free");
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: { error: "Please select a plan." },
};
