<template>
  <div class="category-box border rounded-lg shadow-lg bg-white">
    <!-- Header with fixed color -->
    <div :class="['header p-4 text-white font-bold text-lg', headerColor]">
      {{ category }}
    </div>
    <!-- Article list -->
    <ul class="p-4 space-y-2">
      <li
        v-for="tool in tools"
        :key="tool.id"
        class="text-blue-500 hover:underline"
      >
        <nuxt-link :to="`/article/${tool.id}`">{{ tool.title }}</nuxt-link>
      </li>
    </ul>
    <!-- View More button -->
    <div class="p-4">
      <nuxt-link
        :to="`/category/${slug}`"
        class="text-blue-600 hover:text-blue-800 underline font-medium"
      >
        View More
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: String,
  tools: Array,
  headerColor: String, // Fixed color passed from parent component
  slug: String, // Slug for the category page
});
</script>

<style scoped>
.category-box {
  overflow: hidden;
}

.header {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
</style>
