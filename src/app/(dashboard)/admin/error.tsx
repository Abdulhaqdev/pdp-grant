"use client";

import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
      <AlertTriangleIcon className="mb-4 size-10 text-destructive" />
      <h2 className="text-lg font-semibold">Admin panel error</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {error.message}
      </p>
      <Button className="mt-6" variant="outline" onClick={reset}>
        <RefreshCwIcon />
        Try again
      </Button>
    </div>
  );
}
