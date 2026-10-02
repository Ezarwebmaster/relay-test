import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
    }),
    // Every file in content/blog is an article, so the front matter is required:
    // a missing or malformed title, description or date fails the build instead
    // of silently reaching the reader as an empty entry in the listing.
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().date(),
      }),
    }),
  },
})
