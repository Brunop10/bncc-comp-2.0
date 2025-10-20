const STORAGE_PREFIX = '@bncc-comp';

export const STORAGE_KEYS = {
  FAVORITES: `${STORAGE_PREFIX}:favorites`,
  FAVORITES_DATA: `${STORAGE_PREFIX}:favorites-data`,
  CHAT_HISTORY: `${STORAGE_PREFIX}:chat-history`,
  SAVED_CHATS: `${STORAGE_PREFIX}:saved-chats`,
  APP_EVALUATION_STATE: `${STORAGE_PREFIX}:app-evaluation-state`,
} as const
