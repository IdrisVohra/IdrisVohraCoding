import { cloneElement, isValidElement, useId, useState } from "react";
import type { FocusEvent, MouseEvent, ReactElement, ReactNode } from "react";
import "./Tooltip.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TriggerHandlers {
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface TooltipProps {
  /** Tooltip bubble content. */
  content: ReactNode;
  /** A single focusable/hoverable element that triggers the tooltip. */
  children: ReactElement<TriggerHandlers>;
  /** Side of the trigger the tooltip appears on. @default "top" */
  placement?: TooltipPlacement;
}

export function Tooltip({ content, children, placement = "top" }: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  if (!isValidElement(children)) return children;

  const childProps = children.props;

  const trigger = cloneElement(children, {
    "aria-describedby": visible ? id : undefined,
    onMouseEnter: (event: MouseEvent) => {
      childProps.onMouseEnter?.(event);
      setVisible(true);
    },
    onMouseLeave: (event: MouseEvent) => {
      childProps.onMouseLeave?.(event);
      setVisible(false);
    },
    onFocus: (event: FocusEvent) => {
      childProps.onFocus?.(event);
      setVisible(true);
    },
    onBlur: (event: FocusEvent) => {
      childProps.onBlur?.(event);
      setVisible(false);
    },
  } as Partial<TriggerHandlers> & { "aria-describedby"?: string });

  return (
    <span className="uk-tooltip-wrapper">
      {trigger}
      {visible && (
        <span role="tooltip" id={id} className={`uk-tooltip uk-tooltip--${placement}`}>
          {content}
        </span>
      )}
    </span>
  );
}
