import { useEffect, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

export interface ModalProps {
  /** Controls whether the modal is rendered and visible. */
  isOpen: boolean;
  /** Called when the user requests to close the modal (ESC key, overlay click, or close button). */
  onClose: () => void;
  /** Title rendered in the modal header and used as its accessible name. */
  title: string;
  /** Modal body content. */
  children: ReactNode;
  /** Optional content rendered in the footer, typically action buttons. */
  footer?: ReactNode;
  /** Closes the modal when the overlay is clicked. @default true */
  closeOnOverlayClick?: boolean;
  /** Closes the modal when the Escape key is pressed. @default true */
  closeOnEsc?: boolean;
  /** Size of the modal panel. @default "md" */
  size?: "sm" | "md" | "lg";
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  size = "md",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;

    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable?.[0] ?? dialog)?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (closeOnEsc && event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key === "Tab") {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) onClose();
  };

  return createPortal(
    <div className="uk-modal-overlay" onClick={handleOverlayClick} data-testid="modal-overlay">
      <div
        ref={dialogRef}
        className={`uk-modal uk-modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="uk-modal-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="uk-modal__header">
          <h2 id="uk-modal-title" className="uk-modal__title">
            {title}
          </h2>
          <button
            type="button"
            className="uk-modal__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="uk-modal__body">{children}</div>
        {footer && <div className="uk-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
