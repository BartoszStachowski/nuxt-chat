<script lang="ts" setup>
const { chat, messages, sendMessage } = useChat();

useHead({
  title: chat.value.title,
});
</script>

<template>
  <ChatWindow :chat :messages @send-message="sendMessage" />
</template>

<style></style>
