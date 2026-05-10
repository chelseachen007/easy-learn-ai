/**
 * 雪球日报列表组件
 * 复用 AI 日报的架构，替换品牌色和数据源
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useXueqiuList } from "../../hooks/useXueqiuData";
import { useSearch } from "../../hooks/useSearch";
import { useTagFilter } from "../../hooks/useTagFilter";
import { SearchBar } from "../daily/SearchBar";
import { TagFilter } from "../daily/TagFilter";
import { XueqiuCard } from "./XueqiuCard";

const ITEMS_PER_PAGE = 10;

export const XueqiuList: React.FC = () => {
  const navigate = useNavigate();
  const { dailyList, loading, error } = useXueqiuList();

  const {
    selectedTags,
    allTags,
    filteredByTags,
    hasTagFilter,
    toggleTag,
    clearTags,
  } = useTagFilter(dailyList);

  const { searchTerm, setSearchTerm, filteredList, hasSearch } =
    useSearch(filteredByTags);

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentItems = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTagToggle = (tag: string) => {
    toggleTag(tag);
    setCurrentPage(1);
  };

  const handleClearTags = () => {
    clearTags();
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin border-t-orange-600 mx-auto"></div>
            <Sparkles className="w-8 h-8 text-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            雪球日报正在为你准备
          </div>
          <div className="text-gray-500">正在获取最新的市场资讯...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            加载失败
          </div>
          <div className="text-gray-500 mb-6">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-orange-600/5 via-red-600/5 to-pink-600/5 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-4">
            每日为你精选雪球热门个股、板块动向和市场策略
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="font-medium">{dailyList.length}</span>
              <span>篇日报</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="font-medium">每日更新</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                />
              </div>
              <div className="flex-shrink-0">
                <TagFilter
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearTags={handleClearTags}
                />
              </div>
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    当前筛选:
                  </span>
                  <span className="text-xs text-gray-500">
                    点击标签可快速移除
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-md"
                    >
                      {tag}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {(hasSearch || hasTagFilter) && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-full shadow-sm">
              <span className="text-gray-600">
                找到{" "}
                <span className="font-semibold text-orange-600">
                  {filteredList.length}
                </span>{" "}
                篇相关日报
              </span>
            </div>
          </div>
        )}

        {currentItems.length > 0 ? (
          <div className="grid gap-8 max-w-4xl mx-auto">
            {currentItems.map((daily, index) => (
              <div
                key={daily.date}
                style={{ animationDelay: `${index * 100}ms` }}
                className="transform transition-all duration-300"
              >
                <XueqiuCard daily={daily} onClick={() => navigate(`/xueqiu-daily/${daily.date}`)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">📈</span>
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {hasSearch || hasTagFilter
                ? "没有找到相关日报"
                : "暂无日报内容"}
            </div>
            <div className="text-gray-500 max-w-md mx-auto leading-relaxed">
              {hasSearch || hasTagFilter
                ? "请尝试其他关键词或标签"
                : "内容正在准备中，敬请期待最新的市场资讯"}
            </div>
            {(hasSearch || hasTagFilter) && (
              <div className="mt-6 space-x-4">
                {hasSearch && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    清除搜索
                  </button>
                )}
                {hasTagFilter && (
                  <button
                    onClick={handleClearTags}
                    className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    清除标签筛选
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              上一页
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2)
                  pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25"
                        : "text-gray-700 bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              下一页
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
