import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Link previews and search engines need full URLs. Netlify sets URL on every
// build to the site's main address, so this follows a move to a custom domain.
const siteUrl = (process.env.URL || '').replace(/\/$/, '')

const PAGES = ['/', '/gallery', '/content-creation']

function seo() {
  return {
    name: 'seo',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    generateBundle() {
      if (!siteUrl) {
        this.warn('URL is not set, so link previews will have no image and no sitemap is made. Netlify sets it automatically.')
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: 'User-agent: *\nAllow: /\n' })
        return
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((page) => `  <url><loc>${siteUrl}${page}</loc></url>`).join('\n')}
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    seo(),
  ],
})
