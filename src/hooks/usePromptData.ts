/**
 * Prompt 数据管理 Hook
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { promptApi, PromptItem } from "../utils/promptApi";
import { promptStorage } from "../utils/promptStorage";

export const usePromptData = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    setPrompts(promptApi.getAllPrompts());
  }, [refreshKey]);

  const categories = useMemo(() => promptApi.getCategories(), [refreshKey]);
  const sources = useMemo(() => promptApi.getSources(), [refreshKey]);

  const filteredPrompts = useMemo(() => {
    let result = prompts;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.content.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSource) {
      result = result.filter((p) => p.source === selectedSource);
    }

    if (showFavoritesOnly) {
      result = result.filter((p) => p.favorite);
    }

    return result;
  }, [prompts, searchTerm, selectedCategory, selectedSource, showFavoritesOnly]);

  const toggleFavorite = useCallback((id: string) => {
    promptStorage.toggleFavorite(id);
    reload();
  }, [reload]);

  return {
    prompts: filteredPrompts,
    categories,
    sources,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSource,
    setSelectedSource,
    showFavoritesOnly,
    setShowFavoritesOnly,
    toggleFavorite,
    reload,
  };
};
