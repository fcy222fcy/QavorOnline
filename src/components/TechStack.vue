<script setup lang="ts">
import { computed } from 'vue'
import { Layers } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const techStack = computed(() => data.value.techStack)
const heading = computed(() => data.value.techStackHeading)
</script>

<template>
  <section id="tech" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ heading.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ heading.title }}</h2>
        <p class="section-sub">{{ heading.sub }}</p>
      </div>

      <div v-reveal="'100'" class="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="g in techStack" :key="g.group" class="bg-surface p-5">
          <div class="mb-3 flex items-center gap-2">
            <Layers :size="14" class="text-brand" />
            <span class="font-mono text-xs uppercase tracking-widest text-faint">{{ g.group }}</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="it in g.items" :key="it" class="chip">{{ it }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
