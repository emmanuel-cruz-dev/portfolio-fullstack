"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="lg"
      variant="outline"
      className="gap-2 px-6 cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      Volver atrás
    </Button>
  );
}
