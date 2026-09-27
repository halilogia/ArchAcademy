import fs from 'fs'
import path from 'path'

const distDir = path.resolve(process.cwd(), 'dist')
const indexPath = path.join(distDir, 'index.html')
const fallbackPath = path.join(distDir, '404.html')

if (!fs.existsSync(indexPath)) {
  console.error('[spa-fallback] dist/index.html not found. Run the build first.')
  process.exit(1)
}

const html = fs.readFileSync(indexPath, 'utf8')

if (html.includes('404-fallback-marker')) {
  console.log('[spa-fallback] 404.html already generated.')
  process.exit(0)
}

const fallback = html.replace(
  '</head>',
  `  <!-- 404-fallback-marker: GitHub Pages serves this file for unknown paths so the SPA router can take over. -->\n  <script>
      // Restore the requested path so BrowserRouter renders the deep link instead of "/".
      if (window.location.pathname.indexOf('/ArchAcademy/') === 0) {
        var base = '/ArchAcademy';
        var target = window.location.pathname.slice(base.length) + window.location.search + window.location.hash;
        window.history.replaceState(null, '', target);
      }
    </script>
  </head>`
)

fs.writeFileSync(fallbackPath, fallback, 'utf8')
console.log('[spa-fallback] wrote dist/404.html')
