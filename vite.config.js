import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const resolveBase = () => {
  if (process.env.VITE_BASE_PATH) return process.env.VITE_BASE_PATH.replace(/\/*$/, '/')
  if (process.env.GITHUB_ACTIONS) return '/ArchAcademy/'
  return '/'
}

const base = resolveBase()
const asset = (path) => `${base}${path}`.replace(/([^:]\/)\/+/g, '$1')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'hero-bg.png', 'vite.svg'],
      manifest: {
        name: 'ArchAcademy - Senior Software Architecture Portal',
        short_name: 'ArchAcademy',
        description: 'Master the art of software architecture. Interactive guides for Clean Architecture, DDD, Microservices, and more.',
        theme_color: '#3b82f6',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        categories: ['education', 'developer tools'],
        icons: [
          {
            src: asset('logo.png'),
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: asset('logo.png'),
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: asset('logo.png'),
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: asset('logo.png'),
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: asset('hero-bg.png'),
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json,woff,woff2,ttf,eot}'],
        navigateFallback: `${base}index.html`,
        navigateFallbackDenylist: [/^\/api\//, /^\/progress\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\/cms\/.*\.json$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'cms-collections',
              expiration: {
                maxEntries: 12,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: false,
        type: 'module'
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    exclude: ['**/node_modules/**', '**/dist/**', '**/Universal-Docs/**'],
  },
})
