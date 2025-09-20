<script setup lang="ts">
const appConfig = useAppConfig();

const { createChat } = useChats();
const handleCreateChat = () => {
  createChat();
};
</script>

<template>
  <UContainer class="flex flex-col justify-center items-center h-screen">
    <h1 class="mb-4 font-bold text-3xl">{{ appConfig.title }}</h1>
    <UButton @click="handleCreateChat">Start Chat</UButton>
  </UContainer>
</template>

<style scoped></style>
