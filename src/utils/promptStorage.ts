/**
 * Prompt localStorage 存储工具
 */

export interface UserPrompt {
  id: string;
  title: string;
  category: string;
  source: string;
  content: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "easy-ai-user-prompts";
const FAVORITES_KEY = "easy-ai-favorites";

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

export const promptStorage = {
  getUserPrompts(): UserPrompt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveUserPrompts(prompts: UserPrompt[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  },

  addPrompt(prompt: Omit<UserPrompt, "id" | "createdAt" | "updatedAt">): UserPrompt {
    const now = new Date().toISOString();
    const newPrompt: UserPrompt = {
      ...prompt,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    const prompts = this.getUserPrompts();
    prompts.unshift(newPrompt);
    this.saveUserPrompts(prompts);
    return newPrompt;
  },

  updatePrompt(id: string, updates: Partial<Omit<UserPrompt, "id" | "createdAt">>): UserPrompt | null {
    const prompts = this.getUserPrompts();
    const index = prompts.findIndex((p) => p.id === id);
    if (index === -1) return null;
    prompts[index] = { ...prompts[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveUserPrompts(prompts);
    return prompts[index];
  },

  deletePrompt(id: string): boolean {
    const prompts = this.getUserPrompts();
    const filtered = prompts.filter((p) => p.id !== id);
    if (filtered.length === prompts.length) return false;
    this.saveUserPrompts(filtered);
    return true;
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(id: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(id);
    if (index === -1) {
      favorites.push(id);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return index === -1;
  },

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  },
};
