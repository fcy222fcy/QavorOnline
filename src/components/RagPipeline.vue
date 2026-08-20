<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, ChevronDown, Search, GitMerge, Layers, ListOrdered, Cpu, Sparkles } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const R = computed(() => data.value.rag)
</script>

<template>
  <section id="rag" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ R.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ R.title }}</h2>
        <p class="section-sub">{{ R.intro }}</p>
      </div>

      <!-- Ingest pipeline -->
      <div v-reveal="'100'" class="mt-10">
        <div class="mb-3 flex items-center gap-2 text-sm text-muted">
          <Layers :size="15" class="text-brand" /> {{ R.ingestLabel }}
        </div>
        <div
          class="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-1 md:gap-y-3"
        >
          <template v-for="(s, i) in R.ingest" :key="s.label">
            <div
              class="rounded-lg border border-line bg-surface/70 px-3 py-2 text-center transition-colors hover:border-brand/40 md:min-w-[120px]"
            >
              <div class="text-xs font-medium text-fg">{{ s.label }}</div>
              <div class="text-[10px] text-faint">{{ s.sub }}</div>
            </div>
            <ChevronDown
              v-if="i < R.ingest.length - 1"
              class="mx-auto h-4 w-4 text-faint md:hidden"
              :size="16"
            />
            <ChevronRight
              v-if="i < R.ingest.length - 1"
              class="hidden h-4 w-4 shrink-0 text-faint md:block"
              :size="16"
            />
          </template>
        </div>
      </div>

      <!-- Query pipeline -->
      <div v-reveal="'160'" class="mt-12">
        <div class="mb-3 flex items-center gap-2 text-sm text-muted">
          <Search :size="15" class="text-brand" /> {{ R.queryLabel }}
        </div>

        <div class="mx-auto max-w-3xl">
          <!-- start -->
          <div class="flex flex-col items-center">
            <div class="rounded-lg border border-line bg-surface px-5 py-2.5 text-center">
              <div class="text-sm font-medium text-fg">{{ R.query.start.label }}</div>
              <div class="text-[10px] text-faint">{{ R.query.start.sub }}</div>
            </div>
            <div class="my-1 h-5 w-px bg-line" />
            <div class="font-mono text-[10px] uppercase tracking-widest text-faint">
              {{ R.parallelRecall }}
            </div>
          </div>

          <!-- branch connector -->
          <div class="flex">
            <div class="h-5 flex-1 border-t border-line" />
            <div class="h-5 w-px bg-line" />
            <div class="h-5 flex-1 border-t border-line" />
          </div>

          <!-- Vector + Keyword -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              v-for="b in R.query.branches"
              :key="b.label"
              class="rounded-lg border border-brand/50 bg-brand/[0.06] px-4 py-2.5 text-center"
            >
              <div class="text-sm font-medium text-fg">{{ b.label }}</div>
              <div class="text-[10px] text-faint">{{ b.sub }}</div>
            </div>
          </div>

          <!-- spine -->
          <div class="flex flex-col items-center py-1">
            <div class="h-5 w-px bg-line" />
          </div>

          <!-- RRF -->
          <div class="flex justify-center">
            <div
              class="flex items-center gap-2 rounded-lg border border-brand/50 bg-brand/[0.06] px-5 py-2.5"
            >
              <GitMerge :size="15" class="text-brand" />
              <div class="text-center">
                <div class="text-sm font-medium text-fg">{{ R.query.rrf.label }}</div>
                <div class="text-[10px] text-faint">{{ R.query.rrf.sub }}</div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center py-1">
            <div class="h-5 w-px bg-line" />
          </div>

          <!-- Rerank -->
          <div class="flex justify-center">
            <div
              class="flex items-center gap-2 rounded-lg border border-brand/50 bg-brand/[0.06] px-5 py-2.5"
            >
              <ListOrdered :size="15" class="text-brand" />
              <div class="text-center">
                <div class="text-sm font-medium text-fg">{{ R.query.rerank.label }}</div>
                <div class="text-[10px] text-faint">{{ R.query.rerank.sub }}</div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center py-1">
            <div class="h-5 w-px bg-line" />
          </div>

          <!-- Top-K -->
          <div class="flex justify-center">
            <div class="rounded-lg border border-line bg-surface px-5 py-2.5 text-center">
              <div class="text-sm font-medium text-fg">{{ R.query.topk.label }}</div>
              <div class="text-[10px] text-faint">{{ R.query.topk.sub }}</div>
            </div>
          </div>

          <div class="flex flex-col items-center py-1">
            <div class="h-5 w-px bg-line" />
          </div>

          <!-- LLM -->
          <div class="flex justify-center">
            <div class="flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5">
              <Cpu :size="15" class="text-brand-2" />
              <div class="text-center">
                <div class="text-sm font-medium text-fg">{{ R.query.llm.label }}</div>
                <div class="text-[10px] text-faint">{{ R.query.llm.sub }}</div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center py-1">
            <div class="h-5 w-px bg-line" />
          </div>

          <!-- Answer -->
          <div class="flex justify-center">
            <div
              class="flex items-center gap-2 rounded-lg border border-brand-2/50 bg-brand-2/[0.06] px-5 py-2.5"
            >
              <Sparkles :size="15" class="text-brand-2" />
              <div class="text-center">
                <div class="text-sm font-medium text-fg">{{ R.query.answer.label }}</div>
                <div class="text-[10px] text-faint">{{ R.query.answer.sub }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Explanations -->
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(e, i) in R.explain"
          :key="e.key"
          v-reveal="String(i * 50)"
          class="card p-4"
        >
          <div class="mb-2 flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-brand" />
            <h3 class="font-display text-sm font-semibold text-fg">{{ e.title }}</h3>
          </div>
          <p class="text-[13px] leading-relaxed text-muted">{{ e.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
