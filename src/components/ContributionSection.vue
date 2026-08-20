<script setup lang="ts">
import { computed } from 'vue'
import { UserCheck, Sparkles } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const C = computed(() => data.value.contribution)
</script>

<template>
  <section id="contribution" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ C.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ C.title }}</h2>
        <p class="section-sub">{{ C.subtitle }} — {{ C.note }}</p>
      </div>

      <!-- distinction banner -->
      <div
        v-reveal="'80'"
        class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-brand/30 bg-brand/[0.05] px-4 py-3 text-sm"
      >
        <UserCheck :size="16" class="text-brand" />
        <span class="text-fg">{{ C.banner.scope }}</span>
        <span class="text-faint">{{ C.banner.sep }}</span>
        <span class="text-muted">{{ C.banner.desc }}</span>
      </div>

      <!-- contribution cards -->
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <article
          v-for="(item, i) in C.items"
          :key="item.title"
          v-reveal="String(i * 70)"
          class="relative overflow-hidden rounded-xl border border-line bg-surface/80 p-5 transition-colors hover:border-brand/40"
        >
          <!-- accent edge -->
          <span class="absolute inset-y-0 left-0 w-1 bg-brand/70" aria-hidden="true" />
          <div class="flex items-start justify-between gap-3">
            <h3 class="font-display text-base font-semibold text-fg">{{ item.title }}</h3>
            <span class="flex shrink-0 items-center gap-1 rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">
              <Sparkles :size="11" /> {{ C.myWork }}
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.desc }}</p>
          <ul class="mt-4 grid grid-cols-2 gap-1.5">
            <li
              v-for="p in item.points"
              :key="p"
              class="flex items-center gap-1.5 rounded-md border border-line bg-surface-2/50 px-2 py-1.5 text-xs text-fg"
            >
              <span class="h-1 w-1 rounded-full bg-brand" />
              {{ p }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
