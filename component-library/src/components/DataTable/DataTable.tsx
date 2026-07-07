import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import "./DataTable.css";

export interface DataTableColumn<T> {
  /** Unique key for the column, also used as the default React key. */
  key: string;
  /** Column header text. */
  header: string;
  /** Extracts a sortable/displayable primitive from a row. Used for default rendering and sorting. */
  accessor?: (row: T) => string | number;
  /** Custom cell renderer. Falls back to `accessor(row)` when omitted. */
  render?: (row: T) => ReactNode;
  /** Whether this column can be sorted by clicking its header. Requires `accessor`. @default false */
  sortable?: boolean;
  /** Text alignment for the column. @default "left" */
  align?: "left" | "center" | "right";
  /** Optional fixed width, e.g. "120px" or "20%". */
  width?: string;
}

export interface DataTableProps<T> {
  /** Column definitions. */
  columns: DataTableColumn<T>[];
  /** Row data. */
  data: T[];
  /** Returns a stable unique id for a row, used as the React key. */
  getRowId: (row: T) => string | number;
  /** Shows a loading state instead of rows. */
  isLoading?: boolean;
  /** Message shown when `data` is empty. @default "No data available" */
  emptyMessage?: string;
  /** Accessible caption describing the table's purpose. */
  caption?: string;
  /** Number of rows per page. Omit to disable pagination. */
  pageSize?: number;
  /** Called when a row is clicked. */
  onRowClick?: (row: T) => void;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T>({
  columns,
  data,
  getRowId,
  isLoading = false,
  emptyMessage = "No data available",
  caption,
  pageSize,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    const column = columns.find((col) => col.key === sortKey);
    if (!column?.accessor) return data;
    const accessor = column.accessor;

    return [...data].sort((a, b) => {
      const aValue = accessor(a);
      const bValue = accessor(b);
      if (aValue === bValue) return 0;
      const result = aValue > bValue ? 1 : -1;
      return sortDirection === "asc" ? result : -result;
    });
  }, [data, columns, sortKey, sortDirection]);

  const totalPages = pageSize ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;
  const currentPage = Math.min(page, totalPages);
  const pagedData = pageSize
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;
    if (sortKey !== column.key) {
      setSortKey(column.key);
      setSortDirection("asc");
      return;
    }
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortKey(null);
      setSortDirection(null);
    } else {
      setSortDirection("asc");
    }
  };

  const ariaSortFor = (column: DataTableColumn<T>): "ascending" | "descending" | "none" => {
    if (sortKey !== column.key || !sortDirection) return "none";
    return sortDirection === "asc" ? "ascending" : "descending";
  };

  return (
    <div className="uk-data-table-wrapper">
      <table className="uk-data-table">
        {caption && <caption className="uk-data-table__caption">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={{ width: column.width, textAlign: column.align ?? "left" }}
                aria-sort={column.sortable ? ariaSortFor(column) : undefined}
                className={column.sortable ? "uk-data-table__th--sortable" : undefined}
              >
                {column.sortable ? (
                  <button
                    type="button"
                    className="uk-data-table__sort-button"
                    onClick={() => handleSort(column)}
                  >
                    {column.header}
                    <span className="uk-data-table__sort-icon" aria-hidden="true">
                      {sortKey === column.key && sortDirection === "asc" && "▲"}
                      {sortKey === column.key && sortDirection === "desc" && "▼"}
                      {(sortKey !== column.key || !sortDirection) && "↕"}
                    </span>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="uk-data-table__status">
                Loading…
              </td>
            </tr>
          ) : pagedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="uk-data-table__status">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            pagedData.map((row) => (
              <tr
                key={getRowId(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? "uk-data-table__row--clickable" : undefined}
              >
                {columns.map((column) => (
                  <td key={column.key} style={{ textAlign: column.align ?? "left" }}>
                    {column.render
                      ? column.render(row)
                      : column.accessor
                        ? column.accessor(row)
                        : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pageSize && sortedData.length > 0 && (
        <div className="uk-data-table__pagination">
          <span className="uk-data-table__pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <div className="uk-data-table__pagination-controls">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
