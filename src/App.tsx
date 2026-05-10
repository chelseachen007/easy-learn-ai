/**
 * 应用主组件
 * 配置路由和全局布局
 */

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AIKnowledge from "./pages/AIKnowledge";
import AIKnowledgeDetail from "./pages/AIKnowledgeDetail";
import AIApplication from "./pages/AIApplication";
import AIDaily from "./pages/AIDaily";
import AINavigation from "./pages/AINavigation";
import AIModel from "./pages/AIModel";
import AITimeline from "./pages/AITimeline";
import AIBenchmark from "./pages/AIBenchmark";
import XueqiuDaily from "./pages/XueqiuDaily";
import PromptManager from "./pages/PromptManager";
import { DailyDetail } from "./components/daily/DailyDetail";
import { XueqiuDetail } from "./components/xueqiu/XueqiuDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-knowledge" element={<AIKnowledge />} />
            <Route path="/ai-knowledge/:id" element={<AIKnowledgeDetail />} />
            <Route path="/ai-application" element={<AIApplication />} />
            <Route path="/ai-application/:id" element={<AIApplication />} />
            <Route path="/ai-timeline" element={<AITimeline />} />
            <Route path="/ai-daily" element={<AIDaily />} />
            <Route path="/ai-daily/:date" element={<DailyDetail />} />
            <Route path="/xueqiu-daily" element={<XueqiuDaily />} />
            <Route path="/xueqiu-daily/:date" element={<XueqiuDetail />} />
            <Route path="/ai-model" element={<AIModel />} />
            <Route path="/ai-navigation" element={<AINavigation />} />
            <Route path="/ai-prompts" element={<PromptManager />} />
            <Route path="/ai-benchmark" element={<AIBenchmark />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
