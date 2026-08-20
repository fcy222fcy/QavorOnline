<script setup lang="ts">
import { computed } from 'vue'
import { Github, ArrowRight, Cpu, Search, GitMerge, Layers } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const hero = computed(() => data.value.hero)

// Mini trace rows for the hero mock (durations are illustrative).
const mockSpans = [
  { name: 'LLM', ms: 1680, pct: 100, color: 'bg-brand' },
  { name: 'Rerank', ms: 326, pct: 19, color: 'bg-brand-2' },
  { name: 'Retrieve', ms: 180, pct: 11, color: 'bg-brand-3' },
  { name: 'Tool Call', ms: 103, pct: 6, color: 'bg-faint' },
]
</script>

<template>
  <section class="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
    <div class="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      <!-- Left: copy -->
      <div v-reveal>
        <div class="chip mb-5">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-2" />
          {{ hero.chip }}
        </div>

        <h1 class="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl">
          {{ hero.titlePre }}<br />
          <span class="text-brand">{{ hero.titleAccent }}</span>{{ hero.titlePost }}
        </h1>

        <p class="mt-4 font-display text-lg text-muted sm:text-xl">
          {{ hero.subtitle }}
        </p>

        <p class="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
          {{ hero.description }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <span v-for="t in hero.techTags" :key="t" class="chip">{{ t }}</span>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a :href="hero.primaryCta.href" target="_blank" rel="noreferrer" class="btn btn-primary">
            <Github :size="16" />
            {{ hero.primaryCta.label }}
          </a>
          <a :href="hero.secondaryCta.href" class="btn btn-ghost">
            {{ hero.secondaryCta.label }}
            <ArrowRight :size="16" />
          </a>
        </div>
      </div>

      <!-- Right: technical mock (dashboard / trace) -->
      <div v-reveal="'120'" class="relative">
        <div class="card overflow-hidden shadow-2xl shadow-black/40">
          <!-- window chrome -->
          <div class="flex items-center gap-2 border-b border-line bg-surface-2/60 px-4 py-2.5">
            <span class="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <span class="h-2.5 w-2.5 rounded-full bg-brand-2/70" />
            <span class="ml-3 font-mono text-xs text-faint">qavor.local / agent</span>
          </div>

          <div class="space-y-4 p-5">
            <!-- trace header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm text-fg">
                <Cpu :size="15" class="text-brand" />
                <span class="font-medium">Agent Run</span>
              </div>
              <span class="font-mono text-xs text-muted">2.31s</span>
            </div>

            <!-- span bars -->
            <div class="space-y-2.5">
              <div v-for="s in mockSpans" :key="s.name">
                <div class="mb-1 flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>{{ s.name }}</span>
                  <span>{{ s.ms }}ms</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    class="h-full rounded-full"
                    :class="s.color"
                    :style="{ width: s.pct + '%' }"
                  />
                </div>
              </div>
            </div>

            <!-- retrieval mini row -->
            <div class="grid grid-cols-2 gap-3 border-t border-line pt-4">
              <div class="rounded-lg border border-line bg-surface-2/50 p-3">
                <div class="flex items-center gap-1.5 text-[11px] text-faint">
                  <Search :size="12" /> Vector
                </div>
                <div class="mt-1 font-mono text-lg text-fg">0.86</div>
              </div>
              <div class="rounded-lg border border-line bg-surface-2/50 p-3">
                <div class="flex items-center gap-1.5 text-[11px] text-faint">
                  <GitMerge :size="12" /> Keyword
                </div>
                <div class="mt-1 font-mono text-lg text-fg">0.72</div>
              </div>
            </div>

            <!-- footer status -->
            <div class="flex items-center justify-between border-t border-line pt-3 text-[11px] text-faint">
              <span class="flex items-center gap-1.5"><Layers :size="12" /> RAG · Trace</span>
              <span class="flex items-center gap-1.5 text-brand-2">
                <span class="h-1.5 w-1.5 rounded-full bg-brand-2" /> OK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
