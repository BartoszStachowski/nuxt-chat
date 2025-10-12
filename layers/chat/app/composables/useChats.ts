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

  const createChat = (
    options: {
      projectId?: string;
    } = {}
  ) => {
    const id = (chats.value.length + 1).toString();
    const chat = {
      id,
      title: `Chat ${id}`,
      messages: [],
      projectId: options.projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    chats.value.push(chat);

    return chat;
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
