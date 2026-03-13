import type { Metadata } from "next";
import AIEngineersDashboard from "./AIEngineersDashboard";
import "./ai-engineers.css";

export const metadata: Metadata = {
  title: "AI Engineers | ABISON",
  description:
    "Palantir-style agent network topology — hooks, workflows, pipelines, and their interconnected prompts, APIs, and data flows.",
};

export default function AIEngineersPage() {
  return <AIEngineersDashboard />;
}
