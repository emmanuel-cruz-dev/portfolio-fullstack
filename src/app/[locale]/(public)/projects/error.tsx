"use client";

import { useEffect } from "react";

import { Button } from "@/components";

function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <h2>Algo salió mal!</h2>
      <Button onClick={() => unstable_retry()}>Intentar nuevamente</Button>
    </div>
  );
}

export default Error;
