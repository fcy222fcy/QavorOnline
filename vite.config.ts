import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'

/**
 * Single source of truth for the GitHub Pages base path.
 *
 * GitHub Pages serves a *project* repository at `/<repo>/` but a
 * `<user>.github.io` repository at the site root `/`. We infer both the
 * owner and the repo name from the git remote so the base stays correct
 * after a fork / rename, and fall back to the known values otherwise.
 *
 * If you ever need to hard-code it, change the fallback below — do NOT
 * scatter the repo name across multiple files.
 */
function inferRepo(): { owner: string; name: string } {
  try {
    const url = execSync('git remote get-url origin', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    const m = url.match(/[:/]([^/]+)\/([^/]+?)(?:\.git)?$/)
    if (m && m[1] && m[2]) return { owner: m[1], name: m[2] }
  } catch {
    /* not a git repo or no remote — use fallback */
  }
  return { owner: 'fcy222fcy', name: 'fcy222fcy.github.io-qavor-online' }
}

const { owner, name } = inferRepo()
const BASE = name === `${owner}.github.io` ? '/' : `/${name}/`

export default defineConfig({
  base: BASE,
  plugins: [vue(), tailwindcss()],
})
