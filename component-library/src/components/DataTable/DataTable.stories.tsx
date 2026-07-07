import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import type { DataTableColumn } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@example.com", role: "Admin" },
  { id: 2, name: "Grace Hopper", email: "grace@example.com", role: "Editor" },
  { id: 3, name: "Alan Turing", email: "alan@example.com", role: "Viewer" },
  { id: 4, name: "Katherine Johnson", email: "katherine@example.com", role: "Editor" },
  { id: 5, name: "Margaret Hamilton", email: "margaret@example.com", role: "Admin" },
];

const columns: DataTableColumn<User>[] = [
  { key: "name", header: "Name", accessor: (row) => row.name, sortable: true },
  { key: "email", header: "Email", accessor: (row) => row.email, sortable: true },
  { key: "role", header: "Role", accessor: (row) => row.role, sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    columns,
    data: users,
    getRowId: (row: User) => row.id,
    caption: "Team members",
  },
};

export const Paginated: Story = {
  args: {
    columns,
    data: users,
    getRowId: (row: User) => row.id,
    pageSize: 2,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    getRowId: (row: User) => row.id,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    getRowId: (row: User) => row.id,
  },
};

export const ClickableRows: Story = {
  args: {
    columns,
    data: users,
    getRowId: (row: User) => row.id,
    onRowClick: (row: User) => alert(`Clicked ${row.name}`),
  },
};
