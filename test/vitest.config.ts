import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['junit', 'verbose'],
    outputFile: {
      junit: './report/junit-report.xml',
    },
    globals: true,
    environment: 'node'
  },
});