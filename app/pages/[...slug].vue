<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, async () => {
  const content = await queryCollection('content').path(route.path).first()
  if (!content) {
    return null
  }
  // Articles are also part of the `blog` collection, which is the one that
  // knows about their date.
  const post = route.path.startsWith('/blog/')
    ? await queryCollection('blog').path(route.path).first()
    : null
  return { ...content, date: post?.date }
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <article v-if="page">
    <p v-if="page.date" class="article-meta">
      Published <time :datetime="page.date">{{ formatDate(page.date) }}</time>
    </p>
    <ContentRenderer
      :value="page"
    />
    <p v-if="page.date" class="article-back">
      <NuxtLink to="/blog">&larr; All articles</NuxtLink>
    </p>
  </article>
</template>

<style>
.article-meta {
  color: #666;
  font-style: italic;
  margin: 0 0 0.5rem;
}

.article-back {
  border-top: 1px solid #e0e0e0;
  margin-top: 3rem;
  padding-top: 1rem;
}
</style>
