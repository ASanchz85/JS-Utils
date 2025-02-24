import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// build settings to split node_modules into separate chunks, increasing performance
// each depenency will be loaded when needed, instead of all at once
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0]

            // Force Plotly.js to always be loaded dynamically
            if (
              packageName === 'plotly.js' ||
              packageName === 'react-plotly.js'
            ) {
              return 'plotly-dynamic'
            }

            // Core React dependencies
            if (
              ['react', 'react-dom', 'react-router-dom'].includes(packageName)
            )
              return 'react-core'

            // State management (Redux)
            if (['@reduxjs/toolkit', 'react-redux'].includes(packageName))
              return 'state-management'

            // UI libraries (PrimeReact & icons)
            if (['primereact', 'react-icons'].includes(packageName))
              return 'ui-libs'

            // Date utilities (date-fns)
            if (['date-fns', 'date-fns-tz'].includes(packageName))
              return 'date-utils'

            // Spreadsheet & JSON tools
            if (['xlsx', 'pretty-print-json'].includes(packageName))
              return 'data-utils'

            return 'vendor' // General vendor chunk
          }
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['plotly.js', 'react-plotly.js'] // Ensure Plotly is only dynamically imported
  }
})
