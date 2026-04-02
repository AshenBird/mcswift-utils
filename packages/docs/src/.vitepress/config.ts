import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "@mcswift/utils",
  description: "A foundational utility library monorepo",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AshenBird/mcswift-utils' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '基于 pnpm workspace 的前端和 Node.js 基础工具库 monorepo',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/guide/' }
        ],
        sidebar: [
          {
            text: '包模块列表',
            items: [
              { text: '@mcswift/utils', link: '/packages/utils' },
              { text: '@mcswift/base-utils', link: '/packages/base-utils' },
              { text: '@mcswift/cli', link: '/packages/cli' },
              { text: '@mcswift/esbuild', link: '/packages/esbuild' },
              { text: '@mcswift/node', link: '/packages/node' },
              { text: '@mcswift/npm', link: '/packages/npm' },
              { text: '@mcswift/safe-run', link: '/packages/safe-run' },
              { text: '@mcswift/svn', link: '/packages/svn' },
              { text: '@mcswift/tsc', link: '/packages/tsc' },
              { text: '@mcswift/types', link: '/packages/types' },
              { text: '@mcswift/windows', link: '/packages/windows' }
            ]
          }
        ],
        outlineTitle: '本页目录',
        lastUpdatedText: '最后更新于',
        docFooter: {
          prev: '上一页',
          next: '下一页'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'A front-end and Node.js foundational utility library monorepo',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' }
        ],
        sidebar: [
          {
            text: 'Packages List',
            items: [
              { text: '@mcswift/utils', link: '/en/packages/utils' },
              { text: '@mcswift/base-utils', link: '/en/packages/base-utils' },
              { text: '@mcswift/cli', link: '/en/packages/cli' },
              { text: '@mcswift/esbuild', link: '/en/packages/esbuild' },
              { text: '@mcswift/node', link: '/en/packages/node' },
              { text: '@mcswift/npm', link: '/en/packages/npm' },
              { text: '@mcswift/safe-run', link: '/en/packages/safe-run' },
              { text: '@mcswift/svn', link: '/en/packages/svn' },
              { text: '@mcswift/tsc', link: '/en/packages/tsc' },
              { text: '@mcswift/types', link: '/en/packages/types' },
              { text: '@mcswift/windows', link: '/en/packages/windows' }
            ]
          }
        ],
        outlineTitle: 'On this page',
        lastUpdatedText: 'Last updated',
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        }
      }
    }
  }
})
