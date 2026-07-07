import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["flat", "elevated", "outlined"] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ width: 320 }}>
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Everything your team needs to ship faster.</CardDescription>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>Unlimited projects, shared component library, and priority support.</p>
      </CardBody>
      <CardFooter>
        <Button fullWidth>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args} style={{ width: 280 }}>
      <CardHeader>
        <Badge variant="success">Active</Badge>
        <CardTitle style={{ marginTop: 8 }}>Production API</CardTitle>
        <CardDescription>Click to view deployment details.</CardDescription>
      </CardHeader>
      <CardBody />
    </Card>
  ),
};

export const Outlined: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <Card {...args} style={{ width: 280 }}>
      <CardBody>Minimal outlined surface, no shadow.</CardBody>
    </Card>
  ),
};
