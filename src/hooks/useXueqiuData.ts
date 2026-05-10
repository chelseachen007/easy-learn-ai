/**
 * 雪球日报数据管理 Hook
 */

import { useState, useEffect } from "react";
import { DailyReport } from "../types/daily";
import { xueqiuApiUtils } from "../utils/xueqiuApi";
import toast from "react-hot-toast";

export const useXueqiuList = () => {
  const [dailyList, setDailyList] = useState<DailyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await xueqiuApiUtils.fetchXueqiuList();
        setDailyList(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "未知错误";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { dailyList, loading, error };
};

export const useXueqiuContent = (date: string) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const text = await xueqiuApiUtils.fetchXueqiuContent(date);
        setContent(text);
        toast.success("雪球日报加载成功！");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "未知错误";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [date]);

  return { content, loading, error };
};
