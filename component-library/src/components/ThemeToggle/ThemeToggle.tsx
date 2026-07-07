import { useTheme } from "../../theme/ThemeProvider";
import type { ThemeMode } from "../../theme/ThemeProvider";
import "./ThemeToggle.css";

const MODES: ThemeMode[] = ["light", "dark", "system"];

const LABELS: Record<ThemeMode, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

export interface ThemeToggleProps {
  /** Additional class name applied to the root button. */
  className?: string;
}

/** Cycles between light → dark → system on each click, with an animated sun/moon glyph. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const handleClick = () => {
    const currentIndex = MODES.indexOf(theme);
    const next = MODES[(currentIndex + 1) % MODES.length];
    setTheme(next);
  };

  return (
    <button
      type="button"
      className={["uk-theme-toggle", className ?? ""].filter(Boolean).join(" ")}
      onClick={handleClick}
      aria-label={`${LABELS[theme]}. Click to change.`}
      title={LABELS[theme]}
      data-mode={theme}
    >
      <span className="uk-theme-toggle__track" data-resolved={resolvedTheme}>
        <span className="uk-theme-toggle__thumb">
          <SunIcon className="uk-theme-toggle__icon uk-theme-toggle__icon--sun" />
          <MoonIcon className="uk-theme-toggle__icon uk-theme-toggle__icon--moon" />
        </span>
      </span>
      {theme === "system" && <span className="uk-theme-toggle__badge">A</span>}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="1.5" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22.5" />
        <line x1="1.5" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22.5" y2="12" />
        <line x1="4.2" y1="4.2" x2="6" y2="6" />
        <line x1="18" y1="18" x2="19.8" y2="19.8" />
        <line x1="4.2" y1="19.8" x2="6" y2="18" />
        <line x1="18" y1="6" x2="19.8" y2="4.2" />
      </g>
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z"
        fill="currentColor"
      />
    </svg>
  );
}
