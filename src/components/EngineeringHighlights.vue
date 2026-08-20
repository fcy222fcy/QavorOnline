<script setup lang="ts">
import { computed } from 'vue'
import { Zap } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const engineering = computed(() => data.value.engineering)
const heading = computed(() => data.value.engineeringHeading)
</script>

<template>
  <section class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ heading.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ heading.title }}</h2>
        <p class="section-sub">{{ heading.sub }}</p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2">
        <div
          v-for="(h, i) in engineering"
          :key="h.title"
          v-reveal="String(i * 70)"
          class="card flex items-start gap-4 p-5 transition-colors hover:border-brand/40"
        >
          <div
            class="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-brand"
          >
            <Zap :size="18" />
          </div>
          <div>
            <h3 class="font-display text-base font-semibold text-fg">{{ h.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ h.desc }}</p>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span v-for="t in h.tags" :key="t" class="chip">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
