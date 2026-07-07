import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import type { DataTableColumn } from "./DataTable";

interface Row {
  id: number;
  name: string;
  age: number;
}

const rows: Row[] = [
  { id: 1, name: "Charlie", age: 35 },
  { id: 2, name: "Alice", age: 28 },
  { id: 3, name: "Bob", age: 42 },
];

const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, sortable: true },
  { key: "age", header: "Age", accessor: (r) => r.age, sortable: true },
];

function getBodyRows() {
  const table = screen.getByRole("table");
  const rowsInTable = within(table).getAllByRole("row");
  return rowsInTable.slice(1);
}

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(<DataTable columns={columns} data={rows} getRowId={(r) => r.id} />);
    expect(screen.getByRole("columnheader", { name: /Name/ })).toBeInTheDocument();
    expect(getBodyRows()).toHaveLength(3);
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("shows the empty message when there is no data", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        getRowId={(r) => r.id}
        emptyMessage="Nothing here"
      />,
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("shows a loading state", () => {
    render(<DataTable columns={columns} data={rows} getRowId={(r) => r.id} isLoading />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
    expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
  });

  it("sorts ascending then descending then back to unsorted on repeated header clicks", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={rows} getRowId={(r) => r.id} />);
    const nameHeaderButton = screen.getByRole("button", { name: /Name/ });

    await user.click(nameHeaderButton);
    let cells = getBodyRows().map((row) => within(row).getAllByRole("cell")[0].textContent);
    expect(cells).toEqual(["Alice", "Bob", "Charlie"]);

    await user.click(nameHeaderButton);
    cells = getBodyRows().map((row) => within(row).getAllByRole("cell")[0].textContent);
    expect(cells).toEqual(["Charlie", "Bob", "Alice"]);

    await user.click(nameHeaderButton);
    cells = getBodyRows().map((row) => within(row).getAllByRole("cell")[0].textContent);
    expect(cells).toEqual(["Charlie", "Alice", "Bob"]);
  });

  it("calls onRowClick with the clicked row", async () => {
    const user = userEvent.setup();
    const onRowClick = jest.fn();
    render(
      <DataTable columns={columns} data={rows} getRowId={(r) => r.id} onRowClick={onRowClick} />,
    );
    await user.click(screen.getByText("Alice"));
    expect(onRowClick).toHaveBeenCalledWith(rows[1]);
  });

  it("paginates rows according to pageSize", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={rows} getRowId={(r) => r.id} pageSize={2} />);
    expect(getBodyRows()).toHaveLength(2);
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(getBodyRows()).toHaveLength(1);
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });
});
