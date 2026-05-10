/**
 * 雪球日报详情组件
 */

import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  ExternalLink,
  Calendar,
  Sparkles,
  Globe,
  BookOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { useXueqiuContent } from "../../hooks/useXueqiuData";

import "github-markdown-css/github-markdown-light.css";

export const XueqiuDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { content, loading, error } = useXueqiuContent(date || "");

  useEffect(() => {
    if (!date) {
      navigate("/xueqiu-daily");
    }
  }, [date, navigate]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `雪球日报 - ${date}`,
          text: "雪球每日市场资讯",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("链接已复制到剪贴板");
      }
    } catch {
      toast.error("分享失败");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    return {
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      weekday: `星期${weekdays[date.getDay()]}`,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <button
                onClick={() => navigate("/xueqiu-daily")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回列表
              </button>
            </div>
            <div className="text-center py-20">
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin border-t-orange-600 mx-auto"></div>
                <Sparkles className="w-8 h-8 text-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-2">
                正在加载雪球日报
              </div>
              <div className="text-gray-500">请稍候片刻...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <button
                onClick={() => navigate("/xueqiu-daily")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回列表
              </button>
            </div>
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⚠️</span>
              </div>
              <div className="text-xl font-semibold text-gray-700 mb-2">
                加载失败
              </div>
              <div className="text-gray-500 mb-6">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                重新加载
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <button
                onClick={() => navigate("/xueqiu-daily")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回列表
              </button>
            </div>
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl">📈</span>
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-4">
                日报内容不存在
              </div>
              <div className="text-gray-500">
                未找到该日期的雪球日报，请返回列表查看
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dateInfo = formatDate(date || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-orange-600/3 via-red-600/3 to-pink-600/3 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/8 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-400/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/xueqiu-daily"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 hover:bg-white/50 px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回列表
            </Link>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </button>
              <button
                onClick={() => window.open(window.location.href, "_blank")}
                className="flex items-center px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                新窗口打开
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-8 mb-8 shadow-lg shadow-orange-500/5">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mx-auto mb-6 shadow-lg shadow-orange-500/25">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent mb-6">
              雪球日报
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span className="font-medium">{dateInfo.date}</span>
                <span className="text-sm text-gray-500">
                  {dateInfo.weekday}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-red-500" />
                <span className="text-sm">市场资讯</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="text-sm">每日精选</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg shadow-orange-500/5 overflow-hidden">
            <div className="prose prose-lg prose-slate max-w-none p-8 markdown-content">
              <div className="markdown-body">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl px-6 py-3 shadow-sm">
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                分享给好友
              </button>
              <div className="w-px h-4 bg-gray-300"></div>
              <Link
                to="/xueqiu-daily"
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回列表
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .markdown-content { line-height: 1.7; }
        .markdown-content pre { margin: 0; }
        .markdown-content :first-child { margin-top: 0; }
        .markdown-content :last-child { margin-bottom: 0; }
        .prose h1:first-child { margin-top: 0; }
        .prose blockquote { font-style: normal; position: relative; }
        .prose blockquote::before {
          content: '"';
          font-size: 3rem;
          color: #f97316;
          position: absolute;
          left: -0.5rem;
          top: -1rem;
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
};
