/**
 * Prompt 列表组件 - 主视图
 */

import React, { useState } from "react";
import { Plus, Search, Star, Sparkles, X } from "lucide-react";
import { usePromptData } from "../../hooks/usePromptData";
import { promptStorage } from "../../utils/promptStorage";
import { PromptItem } from "../../utils/promptApi";
import { PromptCard } from "./PromptCard";
import { PromptForm } from "./PromptForm";
import toast from "react-hot-toast";

export const PromptList: React.FC = () => {
  const {
    prompts,
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
  } = usePromptData();

  const [showForm, setShowForm] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptItem | null>(null);

  const handleSave = (data: { title: string; category: string; source: string; content: string; tags: string[] }) => {
    if (editingPrompt?.isUserCreated) {
      promptStorage.updatePrompt(editingPrompt.id, data);
      toast.success("Prompt 已更新");
    } else {
      promptStorage.addPrompt({ ...data, favorite: false });
      toast.success("Prompt 已添加");
    }
    setShowForm(false);
    setEditingPrompt(null);
    reload();
  };

  const handleEdit = (prompt: PromptItem) => {
    if (!prompt.isUserCreated) return;
    setEditingPrompt(prompt);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定删除这个 Prompt 吗？")) {
      promptStorage.deletePrompt(id);
      toast.success("已删除");
      reload();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-teal-600/5 via-cyan-600/5 to-blue-600/5 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-4">
            收藏、管理和发现优质 AI Prompt
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span className="font-medium">{prompts.length}</span>
              <span>个 Prompt</span>
            </div>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索 Prompt..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  showFavoritesOnly
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Star className="w-4 h-4" fill={showFavoritesOnly ? "currentColor" : "none"} />
                收藏
              </button>
              <button
                onClick={() => { setEditingPrompt(null); setShowForm(true); }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-teal-500/25 hover:scale-[1.02] transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                添加
              </button>
            </div>

            {/* 分类和来源筛选 */}
            <div className="mt-3 pt-3 border-t border-gray-200/50 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 self-center mr-1">分类:</span>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  !selectedCategory
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === cat
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 self-center mr-1">来源:</span>
              <button
                onClick={() => setSelectedSource(null)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  !selectedSource
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              {sources.map((src) => (
                <button
                  key={src}
                  onClick={() => setSelectedSource(selectedSource === src ? null : src)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedSource === src
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>

            {/* 已选筛选条件 */}
            {(selectedCategory || selectedSource || showFavoritesOnly) && (
              <div className="mt-3 pt-3 border-t border-gray-200/50 flex items-center gap-2">
                <span className="text-xs text-gray-500">当前筛选:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">
                    {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer hover:text-teal-900" onClick={() => setSelectedCategory(null)} />
                  </span>
                )}
                {selectedSource && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full">
                    {selectedSource}
                    <X className="w-3 h-3 cursor-pointer hover:text-cyan-900" onClick={() => setSelectedSource(null)} />
                  </span>
                )}
                {showFavoritesOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full">
                    仅收藏
                    <X className="w-3 h-3 cursor-pointer hover:text-yellow-900" onClick={() => setShowFavoritesOnly(false)} />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Prompt 列表 */}
        {prompts.length > 0 ? (
          <div className="grid gap-4 max-w-4xl mx-auto">
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                onToggleFavorite={toggleFavorite}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">📝</span>
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {searchTerm || selectedCategory || selectedSource || showFavoritesOnly
                ? "没有找到匹配的 Prompt"
                : "还没有 Prompt"}
            </div>
            <div className="text-gray-500 max-w-md mx-auto">
              {searchTerm || selectedCategory || selectedSource || showFavoritesOnly
                ? "尝试调整筛选条件"
                : "点击上方「添加」按钮创建你的第一个 Prompt"}
            </div>
          </div>
        )}
      </div>

      {/* 表单弹窗 */}
      {showForm && (
        <PromptForm
          prompt={editingPrompt}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
