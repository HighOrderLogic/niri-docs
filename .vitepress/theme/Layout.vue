<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

const { isDark } = useData()

function enableTransitions() {
  return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async () => {
  if (enableTransitions()) {
    await document.startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    }).ready
  } else {
    isDark.value = !isDark.value
  }
})
</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
@keyframes scale-mask {
  from {
    mask-size: 0;
  }
  to {
    mask-size: 250vmax;
  }
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-group(root) {
  z-index: 100;
}

::view-transition-new(root) {
    mask: url('/niri-symbolic-solid.svg') center / 0 no-repeat;
    animation: 1.5s ease-out both scale-mask;
}

::view-transition-old(root) {
    animation: 1.5s ease-out both scale-mask;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>