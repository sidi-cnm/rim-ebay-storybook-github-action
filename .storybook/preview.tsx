import type { Preview } from "@storybook/react";
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Providers } from '../app/[locale]/layout/providers'; // Import Providers
import '../app/[locale]/globals.css'; // Import global styles


const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Providers locale="fr"> {/* Wrap Story with Providers */}
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Providers>
    ),
  ],
};

export default preview;
