/**
 * 雪球日报 API 请求工具模块
 */

import { DailyListResponse } from "../types/daily";
import xueqiuData from "./xueqiuData.json";

export const xueqiuApiUtils = {
  async fetchXueqiuList(): Promise<DailyListResponse> {
    try {
      return xueqiuData;
    } catch (error) {
      console.error("Error fetching xueqiu list:", error);
      throw new Error("获取雪球日报列表失败，请稍后重试");
    }
  },

  async fetchXueqiuContent(date: string): Promise<string> {
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/chelseachen007/easy-learn-ai@main/data/xueqiu/md/${date}.md`,
        {
          method: "GET",
          mode: "cors",
          headers: { Accept: "text/plain" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error(`Error fetching xueqiu content for ${date}:`, error);
      throw new Error("获取雪球日报内容失败，请稍后重试");
    }
  },
};
