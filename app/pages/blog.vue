<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('content')
    .where('path', 'startsWith', '/blog/')
    .order('date', { descending: true })
    .all()
})
</script>

<template>
  <div>
    <h1>Blog</h1>
    <div class="blog-list">
      <div v-for="post in posts" :key="post.id" class="blog-post">
        <h2>{{ post.title }}</h2>
        <p class="meta">Published on {{ new Date(post.date).toLocaleDateString() }}</p>
        <p class="description">{{ post.description }}</p>
        <NuxtLink :to="post.path">Read more</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.blog-list {
  margin-top: 2rem;
}

.blog-post {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.blog-post h2 {
  margin-top: 0;
  color: #333;
}

.meta {
  color: #666;
  font-style: italic;
  margin-bottom: 1rem;
}

.description {
  margin-bottom: 1rem;
}
</style>