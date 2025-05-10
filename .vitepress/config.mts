/// <reference types="node" />

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './src',
  title: 'Niri',
  description: 'A scrolling Wayland compositor',
  base: '/niri-docs/',
  head: [['link', { rel: 'icon', href: '/niri-logo.svg' }]],
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Media', link: '/media' }],

    sidebar: [
      {
        text: 'Usage',
        items: [
          { 
            text: 'Getting Started', 
            link: '/getting-started',
            items: [
              { text: 'Main Default Hotkeys', link: '/main-default-hotkeys' },
              { text: 'Building Niri', link: '/building-niri' }
            ]
          },
          { text: 'Example Systemd Setup', link: '/example-systemd-setup' },
          { text: 'Important Software', link: '/important-software' },
          { text: 'Workspaces', link: '/workspaces' },
          { text: 'Floating Windows', link: '/floating-windows' },
          { text: 'Tabs', link: '/tabs' },
          { text: 'Overview', link: '/overview' },
          { text: 'Screencasting', link: '/screencasting' },
          { text: 'Layer-Shell Components', link: '/layer-shell-components' },
          { text: 'IPC and messaging', link: '/ipc-and-messaging' },
          { text: 'Application-Specific Issues', link: '/application-specific-issues' },
          { text: 'Xwayland', link: '/xwayland' },
          { text: 'Gestures', link: '/gestures' },
          { text: 'Packaging Niri', link: '/packaging-niri' },
          { text: 'FAQ', link: '/faq' }
        ]
      }, {
        text: 'Configuration',
        items: [
          { text: 'Introduction', link: '/configuration/introduction' },
          { text: 'Input', link: '/configuration/input' },
          { text: 'Outputs', link: '/configuration/outputs' },
          { text: 'Key Bindings', link: '/configuration/key-bindings' },
          { text: 'Switch Events', link: '/configuration/switch-events' },
          { text: 'Layout', link: '/configuration/layouts' },
          { text: 'Named Workspaces', link: '/configuration/named-workspaces' },
          { text: 'Miscellanous', link: '/configuration/miscellanous' },
          { text: 'Window Rules', link: '/configuration/windows-rules' },
          { text: 'Layer Rules', link: '/configuration/layer-rules' },
          { text: 'Animations', link: '/configuration/animations' },
          { text: 'Gestures', link: '/configuration/gestures' },
          { text: 'Debug Options', link: '/configuration/debug-options' }
        ]
      }, {
        text: 'Development',
        items: [
          { text: 'Design principles', link: '/development/design-principles' },
          { text: 'Developing Niri', link: '/developement/developing-niri' },
          { text: 'Fractional Layout', link: '/developement/fractional-layout' },
          { text: 'Redraw Loop', link: '/developement/redraw-loop' },
          { text: 'Animation Timing', link: '/developement/animation-timing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YaLTeR/niri' }
    ],

    search: {
      provider: 'local'
    },
  },
  markdown: {
    async shikiSetup(shiki) {
      const kdl = await readFile(join(__dirname, 'kdl.json'), 'utf-8')
      await shiki.loadLanguage(JSON.parse(kdl))
    }
  }
})
