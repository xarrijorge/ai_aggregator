<template>
    <div class="tool-card">
        <h3>{{ tool.title}}</h3>
        <p>{{ tool.excerpt}}</p>
        <div>
            <a :href="tool.review" target="_blank">Read Review</a>
            <a :href="tool.url" target="_blank">Visit Now</a>
        </div>
    </div>
</template>

<script setup>
defineProps({
    tool: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.tool-card {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
}

.tool-card a {
    margin: 0 10px;
    color: #007bff;
    text-decoration: none;
}
</style>