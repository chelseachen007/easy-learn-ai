/**
 * 雪球日报页面组件
 */

import React from "react";
import { XueqiuList } from "../components/xueqiu/XueqiuList";
import { Toaster } from "react-hot-toast";

const XueqiuDaily: React.FC = () => {
  return (
    <div className="min-h-screen">
      <XueqiuList />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
    </div>
  );
};

export default XueqiuDaily;
