import { useState } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import "./Avatar.css";

type AvatarCSSProperties = CSSProperties & { "--uk-avatar-hue"?: number };

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Image URL. Falls back to initials when omitted or when the image fails to load. */
  src?: string;
  /** Full name used to derive initials and the accessible label. */
  name: string;
  /** Size of the avatar. @default "md" */
  size?: AvatarSize;
  /** Presence indicator rendered as a small dot on the avatar's edge. */
  status?: AvatarStatus;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getHueFromName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function Avatar({ src, name, size = "md", status, className, style, ...rest }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  return (
    <div
      className={["uk-avatar", `uk-avatar--${size}`, className ?? ""].filter(Boolean).join(" ")}
      role="img"
      aria-label={name}
      style={{ ...style, "--uk-avatar-hue": getHueFromName(name) } as AvatarCSSProperties}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          className="uk-avatar__image"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="uk-avatar__initials" aria-hidden="true">
          {getInitials(name)}
        </span>
      )}
      {status && (
        <span
          className={`uk-avatar__status uk-avatar__status--${status}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
