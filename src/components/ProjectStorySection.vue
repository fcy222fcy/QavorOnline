<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, Compass } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'

const data = useContent()
const story = computed(() => data.value.story)
</script>

<template>
  <section id="story" class="section overflow-hidden">
    <div class="container-x">
      <div class="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div v-reveal>
          <p class="eyebrow">{{ story.eyebrow }}</p>
          <h2 class="section-title mt-3">{{ story.title }}</h2>
          <p class="section-sub">{{ story.intro }}</p>

          <div class="mt-7 rounded-xl border border-brand/20 bg-brand/5 p-5">
            <Compass :size="20" class="text-brand" />
            <p class="mt-3 font-display text-base font-medium leading-relaxed text-fg">
              {{ story.statement }}
            </p>
          </div>
        </div>

        <div v-reveal="'120'" class="relative">
          <div class="absolute top-5 bottom-5 left-[19px] hidden w-px bg-line sm:block" />
          <ol class="space-y-4">
            <li
              v-for="(chapter, index) in story.chapters"
              :key="chapter.title"
              class="relative grid gap-3 sm:grid-cols-[40px_1fr]"
            >
              <div
                class="relative z-10 hidden h-10 w-10 place-items-center rounded-full border border-line-strong bg-bg font-mono text-xs text-brand sm:grid"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </div>
              <article class="card p-5 sm:p-6">
                <p class="font-mono text-[11px] uppercase tracking-widest text-brand">
                  {{ chapter.label }}
                </p>
                <h3 class="mt-2 font-display text-lg font-semibold text-fg">{{ chapter.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-muted">{{ chapter.desc }}</p>
              </article>
            </li>
          </ol>
        </div>
      </div>

      <div
        v-reveal="'180'"
        class="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center"
      >
        <span class="font-medium text-fg">{{ story.originLabel }}</span>
        <ArrowRight :size="15" class="hidden shrink-0 text-brand sm:block" />
        <span class="leading-relaxed">{{ story.origin }}</span>
      </div>
    </div>
  </section>
</template>
