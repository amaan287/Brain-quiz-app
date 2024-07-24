// components/ClientWrapper.tsx
"use client";

import { useQuizConfig } from "@/store/store";
import { ReactNode } from "react";

export default function ClientWrapper({
  defaultContent,
  quizContent,
}: {
  defaultContent: ReactNode;
  quizContent: ReactNode;
}) {
  const config = useQuizConfig((state: any) => state.config);

  console.log("Config Status:", config.status);

  return <>{config.status ? quizContent : defaultContent}</>;
}
