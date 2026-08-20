<script setup lang="ts">
import { computed } from 'vue'
import { Github } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'
import { site } from '../data/project'

const data = useContent()
const footer = computed(() => data.value.footer)
</script>

<template>
  <footer class="border-t border-line bg-surface/40">
    <div class="container-x flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
      <!-- brand -->
      <div class="max-w-sm">
        <div class="flex items-center gap-2">
          <span class="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="6.5" stroke="#22D3EE" stroke-width="2" />
              <circle cx="16" cy="16" r="2.2" fill="#22D3EE" />
              <path d="M22.5 22.5L27 27" stroke="#34D399" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="font-display text-lg font-semibold text-fg">{{ site.name }}</span>
        </div>
        <p class="mt-3 text-sm text-muted">{{ footer.tagline }}</p>
      </div>

      <!-- links -->
      <nav class="flex flex-col gap-2">
        <span class="font-mono text-xs uppercase tracking-widest text-faint">{{ footer.linksLabel }}</span>
        <a
          v-for="l in footer.links"
          :key="l.label"
          :href="l.href"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
        >
          <Github v-if="l.label === footer.links[0].label" :size="14" />
          {{ l.label }}
        </a>
      </nav>
    </div>

    <div class="border-t border-line">
      <div
        class="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-faint sm:flex-row"
      >
        <span>{{ footer.copyright }}</span>
        <span class="font-mono">{{ footer.builtWith }}</span>
      </div>
    </div>
  </footer>
</template>
