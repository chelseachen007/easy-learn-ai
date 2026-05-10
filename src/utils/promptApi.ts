/**
 * Prompt API - 合并内置 prompt + 用户自定义 prompt
 */

import builtInPrompts from "../../data/prompts/prompts.json";
import { promptStorage } from "./promptStorage";

export interface PromptItem {
  id: string;
  title: string;
  category: string;
  source: string;
  content: string;
  tags: string[];
  favorite: boolean;
  isUserCreated?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const promptApi = {
  getAllPrompts(): PromptItem[] {
    const userPrompts: PromptItem[] = promptStorage.getUserPrompts().map((p) => ({
      ...p,
      isUserCreated: true,
    }));

    const favorites = promptStorage.getFavorites();

    const builtIn: PromptItem[] = builtInPrompts.map((p) => ({
      ...p,
      favorite: favorites.includes(p.id),
    }));

    return [...userPrompts, ...builtIn];
  },

  getCategories(): string[] {
    const all = this.getAllPrompts();
    return [...new Set(all.map((p) => p.category))].sort();
  },

  getSources(): string[] {
    const all = this.getAllPrompts();
    return [...new Set(all.map((p) => p.source))].sort();
  },

  getAllTags(): string[] {
    const all = this.getAllPrompts();
    return [...new Set(all.flatMap((p) => p.tags))].sort();
  },
};
