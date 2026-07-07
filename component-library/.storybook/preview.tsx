import { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../src/styles/tokens.css";

const withTheme: Decorator = (Story, context) => {
  const { theme, accent } = context.globals;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-accent", accent);
  }, [theme, accent]);

  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: { disable: true },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      description: "Accent color",
      toolbar: {
        title: "Accent",
        icon: "paintbrush",
        items: [
          { value: "blue", title: "Blue" },
          { value: "violet", title: "Violet" },
          { value: "emerald", title: "Emerald" },
          { value: "rose", title: "Rose" },
          { value: "amber", title: "Amber" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    accent: "blue",
  },
  tags: ["autodocs"],
};

export default preview;
