<script setup lang="ts">
import { computed } from 'vue'
import { GitBranch, Clock, Hash, CheckCircle2, XCircle } from 'lucide-vue-next'
import { useContent } from '../composables/useContent'
import { traceDemo as T, type TraceSpan } from '../data/project'

const data = useContent()
const heading = computed(() => data.value.traceHeading)
const labels = computed(() => data.value.trace.metaLabels)

interface FlatSpan {
  span: TraceSpan
  depth: number
}

function flatten(node: TraceSpan, depth: number, acc: FlatSpan[]) {
  acc.push({ span: node, depth })
  if (node.children) {
    for (const c of node.children) flatten(c, depth + 1, acc)
  }
}

const flat = computed<FlatSpan[]>(() => {
  const acc: FlatSpan[] = []
  flatten(T.root, 0, acc)
  return acc
})

function pct(ms: number): number {
  return Math.max(2, (ms / T.totalMs) * 100)
}

function fmt(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms}ms`
}
</script>

<template>
  <section id="trace" class="section">
    <div class="container-x">
      <div v-reveal class="max-w-2xl">
        <p class="eyebrow">{{ heading.eyebrow }}</p>
        <h2 class="section-title mt-3">{{ heading.title }}</h2>
        <p class="section-sub">{{ heading.sub }}</p>
      </div>

      <div v-reveal="'120'" class="mt-10">
        <div class="card overflow-hidden">
          <!-- trace header -->
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2/50 px-5 py-3">
            <div class="flex items-center gap-2">
              <GitBranch :size="16" class="text-brand" />
              <span class="font-display text-sm font-semibold text-fg">Trace #{{ T.shortId }}</span>
              <span class="font-mono text-xs text-faint">· {{ fmt(T.totalMs) }}</span>
            </div>
            <span class="flex items-center gap-1.5 font-mono text-xs text-brand-2">
              <CheckCircle2 :size="13" /> {{ labels.ok }}
            </span>
          </div>

          <!-- meta grid -->
          <div class="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-4">
            <div class="bg-surface px-5 py-3">
              <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-faint">
                <Hash :size="11" /> {{ labels.traceId }}
              </div>
              <div class="mt-1 font-mono text-xs text-fg">{{ T.traceId }}</div>
            </div>
            <div class="bg-surface px-5 py-3">
              <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-faint">
                <Hash :size="11" /> {{ labels.rootSpanId }}
              </div>
              <div class="mt-1 font-mono text-xs text-fg">{{ T.root.spanId }}</div>
            </div>
            <div class="bg-surface px-5 py-3">
              <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-faint">
                <Clock :size="11" /> {{ labels.duration }}
              </div>
              <div class="mt-1 font-mono text-xs text-fg">{{ fmt(T.totalMs) }}</div>
            </div>
            <div class="bg-surface px-5 py-3">
              <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-faint">
                <CheckCircle2 :size="11" /> {{ labels.status }}
              </div>
              <div class="mt-1 font-mono text-xs text-brand-2">{{ labels.ok }}</div>
            </div>
          </div>

          <!-- span rows -->
          <div class="divide-y divide-line">
            <div
              v-for="row in flat"
              :key="row.span.spanId"
              class="flex items-center gap-3 px-5 py-2.5"
              :style="{ paddingLeft: 20 + row.depth * 18 + 'px' }"
            >
              <!-- status dot -->
              <component
                :is="row.span.status === 'ok' ? CheckCircle2 : XCircle"
                :size="14"
                :class="row.span.status === 'ok' ? 'text-brand-2' : 'text-danger'"
                class="shrink-0"
              />
              <!-- name + bar -->
              <div class="min-w-0 flex-1">
                <div class="flex items-baseline gap-2">
                  <span class="truncate text-sm text-fg">{{ row.span.name }}</span>
                  <span v-if="row.span.note" class="font-mono text-[11px] text-faint">
                    {{ row.span.note }}
                  </span>
                </div>
                <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    class="h-full rounded-full"
                    :class="row.span.status === 'ok' ? 'bg-brand/70' : 'bg-danger/70'"
                    :style="{ width: pct(row.span.durationMs) + '%' }"
                  />
                </div>
              </div>
              <!-- duration + spanid -->
              <div class="shrink-0 text-right">
                <div class="font-mono text-xs text-fg">{{ fmt(row.span.durationMs) }}</div>
                <div class="font-mono text-[10px] text-faint">#{{ row.span.spanId }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
