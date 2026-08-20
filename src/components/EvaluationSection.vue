<script setup lang="ts">
import { computed } from 'vue'
import { Target, CheckCircle2, Circle, FileSearch } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const E = computed(() => data.value.evaluation)

function pct(v: number): number {
  return Math.round(v * 100)
}
</script>

<template>
  <section id="evaluation" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ E.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ E.title }}</h2>
        <p class="section-sub">{{ E.intro }}</p>
      </div>

      <!-- Metrics -->
      <div v-reveal="'100'" class="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div v-for="m in E.metrics" :key="m.key" class="card p-5">
          <div class="text-[11px] font-medium uppercase tracking-wider text-faint">
            {{ m.label }}
          </div>
          <div class="mt-2 font-display text-3xl font-semibold text-fg">{{ m.value.toFixed(2) }}</div>
          <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div class="h-full rounded-full bg-brand-2" :style="{ width: pct(m.value) + '%' }" />
          </div>
        </div>
      </div>

      <!-- Test data panel -->
      <div v-reveal="'160'" class="mt-6">
        <div class="card overflow-hidden">
          <div class="flex items-center gap-2 border-b border-line bg-surface-2/50 px-5 py-3">
            <Target :size="15" class="text-brand" />
            <span class="font-display text-sm font-semibold text-fg">{{ E.sampleLabel }}</span>
          </div>

          <div class="grid gap-px bg-line md:grid-cols-3">
            <!-- question -->
            <div class="bg-surface p-5">
              <div class="text-[10px] uppercase tracking-widest text-faint">{{ E.qLabel }}</div>
              <p class="mt-2 text-sm leading-relaxed text-fg">{{ E.test.question }}</p>
            </div>
            <!-- expected -->
            <div class="bg-surface p-5">
              <div class="text-[10px] uppercase tracking-widest text-faint">{{ E.goldLabel }}</div>
              <div class="mt-2 inline-flex items-center gap-2 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-xs text-brand-2">
                <FileSearch :size="13" />
                {{ E.test.expectedChunk }}
              </div>
            </div>
            <!-- retrieved -->
            <div class="bg-surface p-5">
              <div class="text-[10px] uppercase tracking-widest text-faint">{{ E.retrievedLabel }}</div>
              <ul class="mt-2 space-y-1.5">
                <li
                  v-for="r in E.test.retrieved"
                  :key="r.id"
                  class="flex items-center gap-2 font-mono text-xs"
                  :class="r.hit ? 'text-brand-2' : 'text-faint'"
                >
                  <CheckCircle2 v-if="r.hit" :size="13" />
                  <Circle v-else :size="13" />
                  {{ r.id }}
                  <span v-if="r.hit" class="rounded bg-brand-2/15 px-1.5 text-[10px]">{{ E.hitLabel }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
