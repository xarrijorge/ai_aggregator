<template>
    <div class="home bg-gray-100 min-h-screen py-8">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800">AI Tools Aggregator</h1>
      </header>
  
      <!-- Category Grid -->
      <div class="categories-grid container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryBox
          v-for="category in categories"
          :key="category.name"
          :category="category.name"
          :tools="getToolsForCategory(category.name)"
          :headerColor="category.color"
          :slug="category.slug"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import CategoryBox from "~/components/CategoryBox.vue";
  
  // Predefined categories with fixed colors and slugs
  const categories = ref([
  { id: "chatbots", slug: "chatbots", name: "Chatbots", color: "bg-blue-500" },
  { id: "ai-companions", slug: "ai-companions", name: "AI Companions", color: "bg-green-500" },
  { id: "image-generation", slug: "image-generation", name: "Image Generation", color: "bg-red-500" },
  { id: "voice-interaction", slug: "voice-interaction", name: "Voice Interaction", color: "bg-purple-500" },
  { id: "roleplay-ai", slug: "roleplay-ai", name: "Roleplay AI", color: "bg-yellow-500" },
  { id: "productivity-ai", slug: "productivity-ai", name: "Productivity AI", color: "bg-teal-500" },
  { id: "anime-artwork-generation", slug: "anime-artwork-generation", name: "Anime & Artwork Generation", color: "bg-pink-500" },
  { id: "privacy-focused-ai", slug: "privacy-focused-ai", name: "Privacy-Focused AI", color: "bg-gray-500" },
]);
  
  // Articles fetched from JSON file
  const articles = ref([]);
  
  // Get tools/articles for a specific category, limited to top 10
  const getToolsForCategory = (category) => {
    return articles.value
      .filter((article) => article.categories.includes(category))
      .slice(0, 5); // Limit to top 10 articles
  };
  
  // Fetch articles on component mount
  onMounted(async () => {
    const response = await fetch("/corrected_categorized_articles.json");
    articles.value = await response.json();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  
  .categories-grid {
    display: grid;
    gap: 1.5rem;
  }
  </style>
  