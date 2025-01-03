<template>
    <div class="bg-gray-100 min-h-screen py-8">
      <!-- Header -->
      <header class="text-center bg-white shadow-md py-6 mb-8">
        <h1 class="text-4xl font-bold text-gray-800">
          {{ article?.title || "Loading article..." }}
        </h1>
        <p v-if="article?.excerpt" class="text-lg text-gray-600 mt-2">
          {{ article.excerpt }}
        </p>
      </header>
  
      <!-- Article Details -->
      <div v-if="article" class="container mx-auto px-6 md:px-12">
        <!-- Overview Section -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
          <p class="text-gray-600 mb-4">{{ article.overview.specialty }}</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-700 mb-2">Capabilities</h3>
              <li
                v-for="capability in article.overview.capabilities"
                :key="capability"
                class="text-gray-600"
              >
                - {{ capability }}
              </li>
            </ul>
            <ul class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-700 mb-2">Limitations</h3>
              <li
                v-for="limitation in article.overview.limitations"
                :key="limitation"
                class="text-gray-600"
              >
                - {{ limitation }}
              </li>
            </ul>
          </div>
        </section>
  
        <!-- Pricing Section -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Pricing</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="article.pricing.free_plan" class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg font-medium text-green-600">Free Plan</h3>
              <p class="text-gray-600 mt-2">{{ article.pricing.free_plan }}</p>
            </div>
            <div v-if="article.pricing.paid_plan" class="bg-white shadow-md rounded-lg p-4">
              <h3 class="text-lg font-medium text-blue-600">
                Paid Plan: {{ article.pricing.paid_plan.name }}
              </h3>
              <p class="text-gray-600 mt-2">Price: {{ article.pricing.paid_plan.price }}</p>
              <ul class="mt-4">
                <li
                  v-for="feature in article.pricing.paid_plan.features"
                  :key="feature"
                  class="text-gray-600"
                >
                  - {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- Useful Links Section -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Useful Links</h2>
          <ul class="bg-white shadow-md rounded-lg p-4">
            <li
              v-for="link in article.useful_links"
              :key="link.url"
              class="mb-2"
            >
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </section>
      </div>
  
      <!-- Fallback Message -->
      <p v-else class="text-center text-gray-600">No article found for this ID.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const article = ref(null);
  
  onMounted(async () => {
    const route = useRoute();
    const id = parseInt(route?.params?.id, 10);
  
    if (id) {
      try {
        const response = await fetch("/dummy_articles.json");
        const articles = await response.json();
        article.value = articles.find((a) => a.id === id);
  
        if (!article.value) {
          console.error("Article not found for ID:", id);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    } else {
      console.error("ID parameter is undefined.");
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>