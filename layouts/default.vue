<template>
    <div>
        <layout-the-header></layout-the-header>
        <NuxtPage />
    </div>
</template>
<script setup>
const route = useRoute();
useHead({
    title: route.meta.title,
    meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
})
</script>