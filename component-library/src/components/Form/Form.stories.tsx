import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormActions } from "./Form";
import { TextField } from "../TextField/TextField";
import { Checkbox } from "../Checkbox/Checkbox";
import { Button } from "../Button/Button";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const SignupForm: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Form onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
        <TextField label="Full name" name="name" required />
        <TextField label="Email" name="email" type="email" required />
        <Checkbox label="Subscribe to newsletter" name="newsletter" />
        <FormActions>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Sign up</Button>
        </FormActions>
      </Form>
    </div>
  ),
};
