/**
 * 雪球日报卡片组件
 */

import React from "react";
import { Calendar, Tag, ArrowRight, Clock } from "lucide-react";
import { DailyReport } from "../../types/daily";

interface XueqiuCardProps {
  daily: DailyReport;
  onClick: () => void;
}

export const XueqiuCard: React.FC<XueqiuCardProps> = ({ daily, onClick }) => {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return {
        full: date.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        short: date.toLocaleDateString("zh-CN", {
          month: "short",
          day: "numeric",
        }),
        weekday: date.toLocaleDateString("zh-CN", { weekday: "short" }),
      };
    } catch {
      return { full: dateStr, short: dateStr, weekday: "" };
    }
  };

  const isToday = (dateStr: string) => {
    try {
      return (
        new Date(dateStr).toDateString() === new Date().toDateString()
      );
    } catch {
      return false;
    }
  };

  const dateInfo = formatDate(daily.date);
  const todayReport = isToday(daily.date);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-red-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-50 to-orange-50 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white font-medium shadow-lg">
              <span className="text-sm">
                {dateInfo.short.split("月")[1]?.replace("日", "") || "1"}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {dateInfo.short}
              </div>
              <div className="text-xs text-gray-500">{dateInfo.weekday}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center text-gray-400 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              <span>{todayReport ? "今日" : dateInfo.short}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-4 group-hover:text-orange-600 transition-colors duration-200">
          {daily.title}
        </h3>

        {daily.tags && daily.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {daily.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-100 rounded-full hover:from-orange-100 hover:to-red-100 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>
  );
};
