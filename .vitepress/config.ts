import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  title: 'vlt lab',
  description: '',
  cleanUrls: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://rsms.me/'
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter.css'
      },
    ],
  ],
  buildEnd: genFeed
})