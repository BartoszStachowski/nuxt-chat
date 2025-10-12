export const useChats = () => {
  const chats = useState<Chat[]>('chats', () => []);
  const { data, execute, status } = useFetch<Chat[]>('/api/chats', {
    immediate: false,
    default: () => [],
  });

  const fetchChats = async () => {
    if (status.value !== 'idle') return;
    await execute();
    chats.value = data.value;
  };

  const createChat = async (
    options: {
      projectId?: string;
      title?: string;
    } = {}
  ) => {
    const newChat = await $fetch<Chat>('/api/chats', {
      method: 'POST',
      body: {
        title: options.title,
        projectId: options.projectId,
      },
    });

    chats.value.push(newChat);

    return newChat;
  };

  const createChatAndNavigate = async (
    options: { projectId?: string } = {}
  ) => {
    const chat = createChat(options);
    if (chat.projectId) {
      await navigateTo(`/projects/${chat.projectId}/chats/${chat.id}`);
    } else {
      await navigateTo(`/chats/${chat.id}`);
    }
  };

  const chatsInProject = (projectId: string) => {
    return chats.value.filter((chat) => chat.projectId === projectId);
  };

  return {
    chats,
    createChat,
    createChatAndNavigate,
    chatsInProject,
    fetchChats,
  };
};
