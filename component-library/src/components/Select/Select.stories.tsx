import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Select a country",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: "Please select a country." },
};

export const Disabled: Story = { args: { disabled: true } };
