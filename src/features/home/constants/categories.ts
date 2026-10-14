import {
  Layers,
  Cpu,
  Database,
  Smartphone,
  Wrench,
  BarChart3,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "frontend",
    Icon: Layers,
    from: "#38bdf8",
    to: "#818cf8",
    span: "sm:col-span-2 md:col-span-7 lg:col-span-6",
  },
  {
    id: "backend",
    Icon: Cpu,
    from: "#c084fc",
    to: "#f43f5e",
    span: "sm:col-span-2 md:col-span-4 lg:col-span-5",
  },
  {
    id: "database",
    Icon: Database,
    from: "#34d399",
    to: "#38bdf8",
    span: "sm:col-span-2 md:col-span-3 lg:col-span-8",
  },
  {
    id: "mobile",
    Icon: Smartphone,
    from: "#2dd4bf",
    to: "#a3e635",
    span: "md:col-span-3",
  },
  {
    id: "management",
    Icon: BarChart3,
    from: "#fb7185",
    to: "#a855f7",
    span: "md:col-span-4 lg:col-span-3",
  },
  {
    id: "tools",
    Icon: Wrench,
    from: "#fbbf24",
    to: "#fb923c",
    span: "sm:col-span-2 md:col-span-7 lg:col-span-8",
  },
] as const;
