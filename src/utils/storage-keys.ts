const STORAGE_PREFIX = '@bncc-comp';

export const STORAGE_KEYS = {
  FAVORITES: `${STORAGE_PREFIX}:favorites`,
  CHAT_HISTORY: `${STORAGE_PREFIX}:chat-history`,
  SAVED_CHATS: `${STORAGE_PREFIX}:saved-chats`,
} as const
