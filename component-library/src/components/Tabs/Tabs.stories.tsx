import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: "account", label: "Account", content: <p>Manage your account details here.</p> },
  { value: "security", label: "Security", content: <p>Update your password and 2FA settings.</p> },
  { value: "billing", label: "Billing", content: <p>View invoices and manage your plan.</p> },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Tabs items={items} />
    </div>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Tabs
        items={[
          ...items.slice(0, 2),
          { value: "billing", label: "Billing", content: <p>Locked</p>, disabled: true },
        ]}
      />
    </div>
  ),
};
