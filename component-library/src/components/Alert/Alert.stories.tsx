import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  args: {
    title: "Heads up",
    children: "This is an informational message for the user.",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  render: (args) => (
    <div style={{ width: 380 }}>
      <Alert {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert variant="info" title="Info">
        Your build is queued and will start shortly.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your subscription expires in 3 days.
      </Alert>
      <Alert variant="danger" title="Error">
        Failed to save changes. Please try again.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) return <p>Alert dismissed.</p>;
    return (
      <div style={{ width: 380 }}>
        <Alert variant="success" title="Saved" onDismiss={() => setVisible(false)}>
          Your profile has been updated.
        </Alert>
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  args: { title: undefined },
  render: (args) => (
    <div style={{ width: 380 }}>
      <Alert {...args} variant="warning">
        Some fields are missing required values.
      </Alert>
    </div>
  ),
};
