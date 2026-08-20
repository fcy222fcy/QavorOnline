<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, ChevronDown } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const overview = computed(() => data.value.overview)
</script>

<template>
  <section id="overview" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ overview.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ overview.title }}</h2>
        <p class="section-sub">{{ overview.intro }}</p>
      </div>

      <!-- Flow: vertical on mobile, horizontal on desktop -->
      <div
        v-reveal="'120'"
        class="mt-10 flex flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-1 md:gap-y-4"
      >
        <template v-for="(step, i) in overview.steps" :key="step.label">
          <div
            class="group flex items-center gap-3 rounded-xl border border-line bg-surface/70 px-4 py-3 transition-colors hover:border-brand/40 md:flex-col md:gap-1 md:text-center"
          >
            <span
              class="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line bg-surface-2 font-mono text-xs text-brand"
            >
              {{ i + 1 }}
            </span>
            <div>
              <div class="text-sm font-medium text-fg">{{ step.label }}</div>
              <div class="text-[11px] text-faint">{{ step.sub }}</div>
            </div>
          </div>

          <ChevronDown
            v-if="i < overview.steps.length - 1"
            class="mx-auto h-5 w-5 text-faint md:hidden"
            :size="18"
          />
          <ChevronRight
            v-if="i < overview.steps.length - 1"
            class="hidden h-5 w-5 shrink-0 text-faint md:block"
            :size="18"
          />
        </template>
      </div>
    </div>
  </section>
</template>
