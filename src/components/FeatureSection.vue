<script setup lang="ts">
import { computed } from 'vue'
import { Database, GitMerge, Bot, Activity, BarChart3, Workflow } from 'lucide-vue-next'
import type { Component } from 'vue'
import { useContent } from '../composables/useContent'
import type { IconName } from '../data/project'

const data = useContent()
const features = computed(() => data.value.features)
const heading = computed(() => data.value.featuresHeading)

const icons: Record<IconName, Component> = {
  Database,
  GitMerge,
  Bot,
  Activity,
  BarChart3,
  Workflow,
}
</script>

<template>
  <section id="features" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ heading.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ heading.title }}</h2>
        <p class="section-sub">{{ heading.sub }}</p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(f, i) in features"
          :key="f.title"
          v-reveal="String(i * 60)"
          class="card group p-5 transition-colors hover:border-brand/40"
        >
          <div
            class="mb-4 grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface-2 text-brand transition-colors group-hover:border-brand/40"
          >
            <component :is="icons[f.icon]" :size="20" />
          </div>
          <h3 class="font-display text-base font-semibold text-fg">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ f.desc }}</p>
          <ul class="mt-4 flex flex-wrap gap-1.5">
            <li v-for="p in f.points" :key="p" class="chip">{{ p }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
