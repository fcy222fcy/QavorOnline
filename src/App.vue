<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import OverviewSection from './components/OverviewSection.vue'
import ProjectStorySection from './components/ProjectStorySection.vue'
import FeatureSection from './components/FeatureSection.vue'
import ArchitectureSection from './components/ArchitectureSection.vue'
import RagPipeline from './components/RagPipeline.vue'
import TraceDemo from './components/TraceDemo.vue'
import EvaluationSection from './components/EvaluationSection.vue'
import ScreenshotSection from './components/ScreenshotSection.vue'
import TechStack from './components/TechStack.vue'
import EngineeringHighlights from './components/EngineeringHighlights.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <main id="top">
    <HeroSection />
    <OverviewSection />
    <ProjectStorySection />
    <FeatureSection />
    <ArchitectureSection />
    <RagPipeline />
    <TraceDemo />
    <EvaluationSection />
    <ScreenshotSection />
    <TechStack />
    <EngineeringHighlights />
  </main>
  <Footer />
</template>
