/**
 * Prompt 添加/编辑表单
 */

import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { PromptItem } from "../../utils/promptApi";
import toast from "react-hot-toast";

interface PromptFormProps {
  prompt?: PromptItem | null;
  onSave: (data: { title: string; category: string; source: string; content: string; tags: string[] }) => void;
  onCancel: () => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({ prompt, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("Custom");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (prompt) {
      setTitle(prompt.title);
      setCategory(prompt.category);
      setSource(prompt.source);
      setContent(prompt.content);
      setTagsInput(prompt.tags.join(", "));
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("标题和内容不能为空");
      return;
    }
    const tags = tagsInput
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({
      title: title.trim(),
      category: category.trim() || "未分类",
      source: source.trim() || "Custom",
      content: content.trim(),
      tags,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {prompt ? "编辑 Prompt" : "添加 Prompt"}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              标题 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：代码审查助手"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                分类
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="例如：AI Coding"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                来源
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="例如：Claude Code"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              内容 *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入 Prompt 内容..."
              rows={10}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-colors resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              标签（逗号分隔）
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="例如：coding, best-practices, review"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/25 transition-all duration-200 hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              {prompt ? "保存修改" : "添加 Prompt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
