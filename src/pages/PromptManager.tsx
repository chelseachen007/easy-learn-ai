/**
 * Prompt 管理页面
 */

import React from "react";
import { PromptList } from "../components/prompt/PromptList";
import { Toaster } from "react-hot-toast";

const PromptManager: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PromptList />
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

export default PromptManager;
