import type { Chat } from '@/types';
import { MOCK_CHAT } from './mockData';

export const useChats = () => {
  const chats = useState<Chat[]>('chats', () => [MOCK_CHAT]);

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
  };
};
