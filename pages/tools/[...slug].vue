<template>
  <main>
    <ContentQuery :path="route.path" find="one" v-slot="{ data }">
      <template v-if="data?.title">
        <h1>{{ data}}</h1>
      </template>
    </ContentQuery>
  </main>
</template>
<script setup>
const route = useRoute()
</script>