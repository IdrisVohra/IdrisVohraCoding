import type { HTMLAttributes } from "react";
import "./Card.css";

export type CardVariant = "flat" | "elevated" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual treatment of the card surface. @default "elevated" */
  variant?: CardVariant;
  /** Adds a hover lift + shadow, signalling the card is clickable. @default false */
  interactive?: boolean;
}

export function Card({ variant = "elevated", interactive = false, className, ...rest }: CardProps) {
  const classes = [
    "uk-card",
    `uk-card--${variant}`,
    interactive ? "uk-card--interactive" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...rest} />;
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, ...rest }: CardHeaderProps) {
  return <div className={["uk-card__header", className ?? ""].filter(Boolean).join(" ")} {...rest} />;
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, ...rest }: CardTitleProps) {
  return <h3 className={["uk-card__title", className ?? ""].filter(Boolean).join(" ")} {...rest} />;
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className, ...rest }: CardDescriptionProps) {
  return (
    <p className={["uk-card__description", className ?? ""].filter(Boolean).join(" ")} {...rest} />
  );
}

export type CardBodyProps = HTMLAttributes<HTMLDivElement>;

export function CardBody({ className, ...rest }: CardBodyProps) {
  return <div className={["uk-card__body", className ?? ""].filter(Boolean).join(" ")} {...rest} />;
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, ...rest }: CardFooterProps) {
  return <div className={["uk-card__footer", className ?? ""].filter(Boolean).join(" ")} {...rest} />;
}
