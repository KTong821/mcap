import { Meta, StoryObj } from "@storybook/react";

import { Demo } from "./Demo";

export default {
  title: "Demo",
  component: Demo,
} satisfies Meta<typeof Demo>;

export const Default: StoryObj<typeof Demo> = { name: "Demo" };
