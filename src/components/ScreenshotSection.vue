<script setup lang="ts">
import { computed, reactive } from 'vue'
import { ImageOff } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

// Per-src load state. Real PNGs dropped into /public/screenshots/ will
// display automatically; on error we fall back to a CSS mock UI.
const data = useContent()
const screenshots = computed(() => data.value.screenshots)
const heading = computed(() => data.value.screenshotsHeading)
const failed = reactive<Record<string, boolean>>({})
</script>

<template>
  <section id="screenshots" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ heading.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ heading.title }}</h2>
        <p class="section-sub">{{ heading.sub }}</p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <figure
          v-for="(s, i) in screenshots.items"
          :key="s.id"
          v-reveal="String(i * 80)"
          class="card overflow-hidden"
        >
          <!-- browser chrome -->
          <div class="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-2.5">
            <span class="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-brand-2/70" />
            <span class="ml-3 truncate font-mono text-[11px] text-faint">
              qavor.local / {{ s.id }}
            </span>
          </div>

          <!-- viewport -->
          <div class="relative aspect-[16/10] overflow-hidden bg-surface-2/30">
            <img
              v-if="!failed[s.src]"
              :src="s.src"
              :alt="s.title"
              class="h-full w-full object-cover"
              @error="failed[s.src] = true"
            />

            <!-- ===== Mock UIs (fallback) ===== -->
            <div v-else class="absolute inset-0 p-4 text-left">
              <!-- agent-chat -->
              <div v-if="s.id === 'agent-chat'" class="flex h-full gap-3">
                <div class="hidden w-1/3 flex-col gap-1.5 sm:flex">
                  <div class="rounded-md border border-line bg-surface px-2 py-1.5 text-[11px] text-fg">{{ screenshots.mock.newAgent }}</div>
                  <div class="rounded-md border border-line bg-surface px-2 py-1.5 text-[11px] text-muted">{{ screenshots.mock.ragHelper }}</div>
                  <div class="rounded-md border border-line bg-surface px-2 py-1.5 text-[11px] text-muted">{{ screenshots.mock.toolBot }}</div>
                </div>
                <div class="flex flex-1 flex-col gap-2 overflow-hidden">
                  <div class="ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-brand/15 px-3 py-1.5 text-[11px] text-fg">
                    Go GC 是如何工作的？
                  </div>
                  <div class="max-w-[85%] rounded-lg rounded-bl-sm border border-line bg-surface px-3 py-1.5 text-[11px] text-muted">
                    让我先检索知识库…
                  </div>
                  <div class="max-w-[85%] rounded-lg rounded-bl-sm border border-line bg-surface px-3 py-1.5 text-[11px] text-faint">
                    <span class="text-brand-2">⚙ Tool</span> get_weather → ok
                  </div>
                </div>
              </div>

              <!-- knowledge-base -->
              <div v-else-if="s.id === 'knowledge-base'" class="flex h-full flex-col gap-2">
                <div class="flex items-center justify-between">
                  <div class="text-[11px] font-medium text-fg">{{ screenshots.mock.documents }}</div>
                  <div class="rounded bg-brand/15 px-2 py-0.5 text-[10px] text-brand">{{ screenshots.mock.upload }}</div>
                </div>
                <div
                  v-for="(d, di) in ['golang-gc.md', 'rag-design.md', 'eino-guide.md']"
                  :key="d"
                  class="flex items-center justify-between rounded-md border border-line bg-surface px-3 py-2 text-[11px]"
                >
                  <span class="text-fg">{{ d }}</span>
                  <span
                    class="rounded px-1.5 py-0.5 text-[10px]"
                    :class="di === 2 ? 'bg-warn/15 text-warn' : 'bg-brand-2/15 text-brand-2'"
                  >
                    {{ di === 2 ? screenshots.mock.parsing : screenshots.mock.indexed }}
                  </span>
                </div>
              </div>

              <!-- agent-trace -->
              <div v-else class="flex h-full flex-col gap-1.5 overflow-hidden">
                <div class="flex items-center gap-1.5 text-[11px] text-fg">
                  <span class="h-1.5 w-1.5 rounded-full bg-brand-2" /> Agent Run · 2.31s
                </div>
                <div
                  v-for="sp in ['Retrieve 180ms', 'RRF 12ms', 'Rerank 326ms', 'LLM 1.68s', 'Tool 103ms']"
                  :key="sp"
                  class="flex items-center gap-2 rounded border border-line bg-surface px-2 py-1 text-[10px] text-muted"
                >
                  <span class="h-1 w-1 rounded-full bg-brand" /> {{ sp }}
                </div>
              </div>
            </div>
          </div>

          <!-- caption -->
          <figcaption class="flex items-center gap-2 border-t border-line px-4 py-3">
            <ImageOff v-if="failed[s.src]" :size="14" class="text-faint" />
            <div>
              <div class="text-sm font-medium text-fg">{{ s.title }}</div>
              <div class="text-[11px] text-faint">{{ s.caption }}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
