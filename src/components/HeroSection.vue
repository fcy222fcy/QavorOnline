<script setup lang="ts">
import { computed } from 'vue'
import { Github, ArrowRight, Bot, Database, Wrench, Cpu, Activity, CheckCircle2, Layers } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const hero = computed(() => data.value.hero)

// Mini dashboard stats for the hero mock (values are illustrative).
const mockStats = [
  { icon: Bot, label: 'Agents', value: '6' },
  { icon: Database, label: 'Knowledge Bases', value: '4' },
  { icon: Wrench, label: 'Tools · MCP', value: '12' },
  { icon: Cpu, label: 'Models', value: '3' },
]
const mockRuns = [
  { name: 'RAG Assistant', ms: '2.31s' },
  { name: 'Tool Bot', ms: '1.87s' },
  { name: 'Doc Search', ms: '0.42s' },
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
            <span class="ml-3 font-mono text-xs text-faint">qavor.local / dashboard</span>
          </div>

          <div class="space-y-4 p-5">
            <!-- platform header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm text-fg">
                <Layers :size="15" class="text-brand" />
                <span class="font-medium">Qavor Platform</span>
              </div>
              <span class="flex items-center gap-1.5 font-mono text-xs text-brand-2">
                <span class="h-1.5 w-1.5 rounded-full bg-brand-2" /> Running
              </span>
            </div>

            <!-- platform stat cards -->
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="stat in mockStats"
                :key="stat.label"
                class="rounded-lg border border-line bg-surface-2/50 p-3"
              >
                <div class="flex items-center gap-1.5 text-[11px] text-faint">
                  <component :is="stat.icon" :size="12" /> {{ stat.label }}
                </div>
                <div class="mt-1 font-mono text-lg text-fg">{{ stat.value }}</div>
              </div>
            </div>

            <!-- recent runs -->
            <div class="border-t border-line pt-3">
              <div class="mb-2 flex items-center gap-1.5 text-[11px] text-faint">
                <Activity :size="12" /> Recent Runs
              </div>
              <div class="space-y-1.5">
                <div
                  v-for="run in mockRuns"
                  :key="run.name"
                  class="flex items-center justify-between rounded-md border border-line bg-surface-2/40 px-2.5 py-1.5 font-mono text-[11px]"
                >
                  <span class="flex items-center gap-1.5 text-muted">
                    <CheckCircle2 :size="11" class="text-brand-2" /> {{ run.name }}
                  </span>
                  <span class="text-faint">{{ run.ms }}</span>
                </div>
              </div>
            </div>

            <!-- footer status -->
            <div class="flex items-center justify-between border-t border-line pt-3 text-[11px] text-faint">
              <span class="flex items-center gap-1.5"><Layers :size="12" /> RAG · Trace · SSE</span>
              <span class="flex items-center gap-1.5 text-brand-2">
                <span class="h-1.5 w-1.5 rounded-full bg-brand-2" /> All OK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
