<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Github, Rocket, Menu, X } from 'lucide-vue-next'
import { useContent, useLocale } from '../composables/useContent'
import { site } from '../data/project'

const data = useContent()
const navLinks = computed(() => data.value.nav)
const ui = computed(() => data.value.ui)
const { locale, toggleLocale } = useLocale()
const logoUrl = `${import.meta.env.BASE_URL}qavor-logo.png`

const scrolled = ref(false)
const open = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function close() {
  open.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled
        ? 'border-b border-line bg-bg/80 backdrop-blur-md'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <nav class="container-x flex h-16 items-center justify-between gap-4">
      <!-- Brand -->
      <a href="#top" class="flex items-center gap-2.5" @click="close">
        <img
          :src="logoUrl"
          alt="Qavor 项目图标"
          class="h-8 w-8 rounded-lg border border-line object-cover"
        />
        <span class="font-display text-lg font-semibold tracking-tight text-fg">{{ site.name }}</span>
      </a>

      <!-- Desktop links -->
      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-2">
        <a
          :href="site.githubUrl"
          target="_blank"
          rel="noreferrer"
          class="btn btn-ghost hidden sm:inline-flex"
        >
          <Github :size="16" />
          {{ ui.github }}
        </a>
        <a :href="site.liveDemoUrl" class="btn btn-primary">
          <Rocket :size="16" />
          <span class="hidden sm:inline">{{ ui.liveDemo }}</span>
          <span class="sm:hidden">{{ ui.liveDemoShort }}</span>
        </a>

        <!-- Language switch -->
        <button
          class="btn btn-ghost px-2.5 font-mono text-xs"
          :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'"
          @click="toggleLocale"
        >
          <span :class="locale === 'zh' ? 'text-fg' : 'text-faint'">中</span>
          <span class="mx-0.5 text-faint">/</span>
          <span :class="locale === 'en' ? 'text-fg' : 'text-faint'">EN</span>
        </button>

        <!-- Mobile toggle -->
        <button
          class="btn btn-ghost md:hidden"
          :aria-expanded="open"
          aria-label="Toggle navigation"
          @click="open = !open"
        >
          <Menu v-if="!open" :size="18" />
          <X v-else :size="18" />
        </button>
      </div>
    </nav>

    <!-- Mobile panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="open" class="border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
        <div class="container-x flex flex-col gap-1 py-3">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-fg"
            @click="close"
          >
            {{ link.label }}
          </a>
          <a
            :href="site.githubUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-ghost mt-2 w-full"
            @click="close"
          >
            <Github :size="16" />
            {{ ui.github }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
