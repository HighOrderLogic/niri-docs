/// <reference types="vite/client" />

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Layout from './Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    const components = import.meta.glob('./components/*.vue', { eager: true })

    for (const [path, component] of Object.entries(components))
      app.component(path.match(/\/(\w+)\.vue/)?.[1] ?? '', (component as any)?.default)
  }
} satisfies Theme
