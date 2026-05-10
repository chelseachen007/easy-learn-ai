/**
 * Prompt 卡片组件
 */

import React, { useState } from "react";
import { Copy, Star, Trash2, Edit2, ChevronDown, ChevronUp } from "lucide-react";
import { PromptItem } from "../../utils/promptApi";
import toast from "react-hot-toast";

interface PromptCardProps {
  prompt: PromptItem;
  onToggleFavorite: (id: string) => void;
  onEdit?: (prompt: PromptItem) => void;
  onDelete?: (id: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onToggleFavorite,
  onEdit,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast.success("已复制到剪贴板");
    } catch {
      toast.error("复制失败");
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-gray-900 truncate">
                {prompt.title}
              </h3>
              {prompt.isUserCreated && (
                <span className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 rounded-full border border-teal-100">
                  自定义
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-0.5 bg-gray-100 rounded-full">{prompt.category}</span>
              <span>·</span>
              <span>{prompt.source}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-3">
            <button
              onClick={() => onToggleFavorite(prompt.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                prompt.favorite
                  ? "text-yellow-500 hover:bg-yellow-50"
                  : "text-gray-300 hover:bg-gray-50 hover:text-yellow-400"
              }`}
            >
              <Star className="w-4 h-4" fill={prompt.favorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-50 hover:text-teal-500 transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
            {prompt.isUserCreated && (
              <>
                {onEdit && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit(prompt); }}
                    className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-50 hover:text-blue-500 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(prompt.id); }}
                    className="p-1.5 rounded-lg text-gray-300 hover:bg-gray-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <pre
            className={`text-sm text-gray-600 bg-gray-50 rounded-xl p-3 font-mono whitespace-pre-wrap break-words ${
              !expanded ? "max-h-24 overflow-hidden" : ""
            }`}
          >
            {prompt.content}
          </pre>
          {prompt.content.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 mt-2 font-medium"
            >
              {expanded ? (
                <>收起 <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>展开全文 <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 rounded-full border border-teal-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};
