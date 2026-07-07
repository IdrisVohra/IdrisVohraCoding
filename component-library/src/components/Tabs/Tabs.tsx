import { useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import "./Tabs.css";

export interface TabItem {
  /** Unique identifier for the tab, also used as its React key. */
  value: string;
  /** Label rendered in the tab strip. */
  label: string;
  /** Panel content shown when this tab is active. */
  content: ReactNode;
  /** Disables selecting this tab. */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions, in display order. */
  items: TabItem[];
  /** Initially active tab value (uncontrolled). Defaults to the first non-disabled tab. */
  defaultValue?: string;
  /** Active tab value (controlled). */
  value?: string;
  /** Called with the newly selected tab's value. */
  onChange?: (value: string) => void;
}

export function Tabs({ items, defaultValue, value, onChange }: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? items.find((item) => !item.disabled)?.value ?? items[0]?.value,
  );

  const activeValue = value ?? internalValue;
  const enabledItems = items.filter((item) => !item.disabled);

  const selectTab = (nextValue: string) => {
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = enabledItems.findIndex((item) => item.value === activeValue);
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabledItems.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = enabledItems.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const nextItem = enabledItems[nextIndex];
      selectTab(nextItem.value);
      tabRefs.current[nextItem.value]?.focus();
    }
  };

  const activeItem = items.find((item) => item.value === activeValue);

  return (
    <div className="uk-tabs">
      <div role="tablist" className="uk-tabs__list" aria-orientation="horizontal">
        {items.map((item) => {
          const selected = item.value === activeValue;
          return (
            <button
              key={item.value}
              ref={(el) => {
                tabRefs.current[item.value] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className={["uk-tabs__tab", selected ? "uk-tabs__tab--active" : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => selectTab(item.value)}
              onKeyDown={handleKeyDown}
            >
              {item.label}
            </button>
          );
        })}
        <span
          className="uk-tabs__indicator"
          style={{
            transform: `translateX(${items.findIndex((i) => i.value === activeValue) * 100}%)`,
            width: items.length ? `${100 / items.length}%` : 0,
          }}
          aria-hidden="true"
        />
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          role="tabpanel"
          id={`${baseId}-panel-${item.value}`}
          aria-labelledby={`${baseId}-tab-${item.value}`}
          hidden={item.value !== activeValue}
          className="uk-tabs__panel"
        >
          {item.value === activeValue ? activeItem?.content : null}
        </div>
      ))}
    </div>
  );
}
