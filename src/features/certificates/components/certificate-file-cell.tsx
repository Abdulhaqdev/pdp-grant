"use client";

import { ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  isCertificateImage,
  resolveCertificateFileUrl,
} from "@/features/certificates/lib/resolve-certificate-file-url";

interface CertificateFileCellProps {
  filePath: string;
  title?: string;
}

export function CertificateFileCell({
  filePath,
  title = "Certificate file",
}: CertificateFileCellProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const href = resolveCertificateFileUrl(filePath);
  const isImage = isCertificateImage(filePath);

  if (!filePath) {
    return <span className="text-muted-foreground">—</span>;
  }

  if (isImage) {
    return (
      <>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="relative shrink-0 overflow-hidden rounded-md border bg-muted ring-offset-background transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label={`Preview ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={href}
              alt={title}
              className="size-14 object-cover"
              loading="lazy"
            />
          </button>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={
              <a href={href} target="_blank" rel="noopener noreferrer" />
            }
          >
            <ExternalLinkIcon className="size-4" />
            Open
          </Button>
        </div>

        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="gap-0 p-2 sm:max-w-3xl">
            <DialogHeader className="px-2 pt-2">
              <DialogTitle className="text-base font-medium">{title}</DialogTitle>
            </DialogHeader>
            <div className="flex max-h-[75vh] items-center justify-center overflow-auto rounded-lg bg-muted/40 p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={href}
                alt={title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      nativeButton={false}
      render={<a href={href} target="_blank" rel="noopener noreferrer" />}
    >
      <FileTextIcon className="size-4" />
      View file
    </Button>
  );
}
