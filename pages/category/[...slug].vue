xi<template>
    <div class="bg-gray-100 min-h-screen py-8">
      <!-- Header -->
      <header class="text-center mb-8">
        <h1 v-if="currentCategory" class="text-4xl font-bold text-gray-800">
          {{ currentCategory }}
        </h1>
        <p v-else class="text-lg text-gray-600">Loading category...</p>
      </header>
  
      <!-- Search Bar -->
      <div class="container mx-auto mb-8 px-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search tools..."
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <!-- Tools Grid -->
      <div v-if="filteredTools.length" class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
          class="tool-card bg-white shadow-lg rounded-lg p-6"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">{{ tool.title }}</h2>
          <p class="text-gray-600 mb-4">{{ tool.excerpt }}</p>
          <div class="flex justify-between">
            <nuxt-link
              :to="`/articles/${tool.id}`"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read More
            </nuxt-link>
            <a
              :href="getMainWebsite(tool)"
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-600 hover:text-green-800 font-medium"
            >
              Visit Now
            </a>
          </div>
        </div>
      </div>
  
      <!-- No Tools Message -->
      <p v-else class="text-center text-gray-600">No tools available for this category.</p>
    </div>
  </template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const currentCategory = ref("");
const articles = ref([]);
const searchQuery = ref(""); // Search query input

// Filter tools by category and search query
const filteredTools = computed(() => {
  return articles.value
    .filter((article) =>
      article.categories.includes(currentCategory.value)
    )
    .filter((article) =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Get the main website link from the "useful_links" array
const getMainWebsite = (tool) => {
  const mainWebsite = tool.useful_links?.find(
    (link) => link.label.toLowerCase() === "main website"
  );
  return mainWebsite ? mainWebsite.url : "#"; // Default to "#" if not found
};

onMounted(async () => {
  const route = useRoute();
  const slug = route?.params?.slug;

  if (slug) {
    currentCategory.value = formatSlugToCategory(slug);

    try {
      const response = await fetch("/corrected_categorized_articles.json");
      articles.value = await response.json();
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  } else {
    console.error("Slug parameter is undefined.");
  }
});

// Helper function to format the slug into a readable category name
const formatSlugToCategory = (slug) => {
  return slug[0]
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize each word
};
</script>
<style scoped>
.container {
  max-width: 1200px;
}
.tool-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
  