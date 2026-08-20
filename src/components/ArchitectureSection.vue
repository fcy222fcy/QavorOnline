<script setup lang="ts">
import { computed } from 'vue'
import { useContent } from '../composables/useContent'

// Core tier layout derived from the real project structure.
const data = useContent()
const A = computed(() => data.value.architecture)
const heading = computed(() => data.value.architectureHeading)

const agentCol = computed(() => [A.value.agent, A.value.eino, A.value.toolCalling])
const traceCol = computed(() => [A.value.trace])
const ragChildren = computed(() => A.value.retrieval.children ?? [])
const ragAux = computed(() => [A.value.minio, A.value.python])

// Mobile reading order.
const mobileFlow = computed(() => [
  { tier: A.value.tierLabels.frontend, nodes: [A.value.frontend] },
  { tier: A.value.tierLabels.api, nodes: [A.value.api] },
  { tier: A.value.tierLabels.agent, nodes: agentCol.value },
  { tier: A.value.tierLabels.rag, nodes: [A.value.rag, ...ragChildren.value, ...ragAux.value] },
  { tier: A.value.tierLabels.trace, nodes: traceCol.value },
  { tier: A.value.tierLabels.storage, nodes: [A.value.pg, A.value.redis] },
])
</script>

<template>
  <section id="architecture" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ heading.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ heading.title }}</h2>
        <p class="section-sub">{{ heading.sub }}</p>
      </div>

      <!-- ============ Desktop diagram ============ -->
      <div v-reveal="'120'" class="mt-12 hidden md:block">
        <!-- Frontend -->
        <div class="flex justify-center">
          <div class="rounded-lg border border-line bg-surface px-5 py-3 text-center">
            <div class="text-sm font-semibold text-fg">{{ A.frontend.label }}</div>
            <div class="text-[11px] text-faint">{{ A.frontend.sub }}</div>
          </div>
        </div>

        <!-- spine -->
        <div class="flex flex-col items-center">
          <div class="h-6 w-px bg-line" />
          <span class="my-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">HTTP / SSE</span>
          <div class="h-6 w-px bg-line" />
        </div>

        <!-- API -->
        <div class="flex justify-center">
          <div class="rounded-lg border border-line bg-surface px-6 py-3 text-center">
            <div class="text-sm font-semibold text-fg">{{ A.api.label }}</div>
            <div class="text-[11px] text-faint">{{ A.api.sub }}</div>
          </div>
        </div>

        <!-- fan-out connector -->
        <div class="flex">
          <div class="h-6 flex-1 border-t border-line" />
          <div class="h-6 w-px bg-line" />
          <div class="h-6 flex-1 border-t border-line" />
        </div>

        <!-- Core tier: 3 columns -->
        <div class="grid grid-cols-3 gap-5">
          <!-- Agent column -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-full rounded-lg border-l-2 border-l-brand border-y border-r border-line bg-surface px-4 py-3 text-center">
              <div class="text-sm font-semibold text-fg">{{ A.agent.label }}</div>
              <div class="text-[11px] text-faint">{{ A.agent.sub }}</div>
            </div>
            <div
              v-for="n in agentCol.slice(1)"
              :key="n.label"
              class="w-3/4 rounded-lg border border-line bg-surface-2/60 px-3 py-2 text-center"
            >
              <div class="text-xs text-fg">{{ n.label }}</div>
              <div class="text-[10px] text-faint">{{ n.sub }}</div>
            </div>
          </div>

          <!-- RAG column -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-full rounded-lg border-l-2 border-l-brand-2 border-y border-r border-line bg-surface px-4 py-3 text-center">
              <div class="text-sm font-semibold text-fg">{{ A.rag.label }}</div>
              <div class="text-[11px] text-faint">{{ A.rag.sub }}</div>
            </div>
            <div class="w-full rounded-lg border border-line bg-surface-2/40 p-2">
              <div class="mb-1 text-center font-mono text-[10px] uppercase tracking-widest text-faint">
                {{ A.retrieval.label }}
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <div
                  v-for="n in ragChildren"
                  :key="n.label"
                  class="rounded-md border border-line bg-surface px-2 py-1.5 text-center"
                >
                  <div class="text-[11px] text-fg">{{ n.label }}</div>
                  <div class="text-[9px] text-faint">{{ n.sub }}</div>
                </div>
              </div>
            </div>
            <div class="flex w-full flex-wrap justify-center gap-1.5">
              <span v-for="n in ragAux" :key="n.label" class="chip">{{ n.label }}</span>
            </div>
          </div>

          <!-- Trace column -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-full rounded-lg border-l-2 border-l-brand-3 border-y border-r border-line bg-surface px-4 py-3 text-center">
              <div class="text-sm font-semibold text-fg">{{ A.trace.label }}</div>
              <div class="text-[11px] text-faint">{{ A.trace.sub }}</div>
            </div>
          </div>
        </div>

        <!-- spine to storage -->
        <div class="flex flex-col items-center">
          <div class="h-6 w-px bg-line" />
        </div>

        <!-- Storage tier -->
        <div class="flex justify-center gap-5">
          <div class="rounded-lg border border-line bg-surface px-6 py-3 text-center">
            <div class="text-sm font-semibold text-fg">{{ A.pg.label }}</div>
            <div class="text-[11px] text-faint">{{ A.pg.sub }}</div>
          </div>
          <div class="rounded-lg border border-line bg-surface px-6 py-3 text-center">
            <div class="text-sm font-semibold text-fg">{{ A.redis.label }}</div>
            <div class="text-[11px] text-faint">{{ A.redis.sub }}</div>
          </div>
        </div>
      </div>

      <!-- ============ Mobile simplified stack ============ -->
      <div class="mt-10 md:hidden">
        <div
          v-for="(group, gi) in mobileFlow"
          :key="group.tier"
          class="flex flex-col items-center"
        >
          <div class="w-full max-w-sm">
            <div class="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              {{ group.tier }}
            </div>
            <div class="space-y-2">
              <div
                v-for="n in group.nodes"
                :key="n.label"
                class="rounded-lg border border-line bg-surface px-4 py-2.5 text-center"
              >
                <div class="text-sm text-fg">{{ n.label }}</div>
                <div class="text-[10px] text-faint">{{ n.sub }}</div>
              </div>
            </div>
          </div>
          <div v-if="gi < mobileFlow.length - 1" class="my-2 h-5 w-px bg-line" />
        </div>
      </div>
    </div>
  </section>
</template>
