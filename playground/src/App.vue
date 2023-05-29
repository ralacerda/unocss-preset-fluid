<script setup lang="ts">
import "virtual:uno.css";
</script>

<template>
  <div class="flow content">
    <h1 class="fluid-6">Hello</h1>
    <p class="fluid-3">Space</p>
    <p class="fluid--1">Smol</p>
  </div>
</template>

<style scoped>
.content * {
  margin-block: 0;
}

.flow > * + * {
  margin-top: 0.5em;
}
</style>
