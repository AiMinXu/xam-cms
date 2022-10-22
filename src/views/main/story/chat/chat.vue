<template>
  <div class="chat">
    <Editor v-model:value="htmlStr"/>
  </div>
</template>

<script setup lang="ts">
import Editor from '@/base-ui/editor';
import { ref } from 'vue';
const htmlStr = ref<string>('ikun')
</script>

<style scoped>

</style>
