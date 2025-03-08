import { createContentLoader, type SiteConfig } from 'vitepress'

export async function genFeed(config: SiteConfig) {
  const posts = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )
}
