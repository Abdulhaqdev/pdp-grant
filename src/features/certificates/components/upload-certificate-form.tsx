"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UploadIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import { LabeledSelect } from "@/components/admin/labeled-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadCertificate } from "@/features/certificates/hooks/use-upload-certificate";
import {
  CERTIFICATE_TYPES,
  uploadCertificateSchema,
  type UploadCertificateFormValues,
} from "@/schemas/upload-certificate.schema";

export function UploadCertificateForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadCertificate();

  const form = useForm<UploadCertificateFormValues>({
    resolver: zodResolver(uploadCertificateSchema),
    defaultValues: {
      title: "",
      cert_type: CERTIFICATE_TYPES[0].value,
    },
  });

  const selectedFile = form.watch("file");

  function onSubmit(values: UploadCertificateFormValues) {
    upload.mutate(
      {
        title: values.title,
        cert_type: values.cert_type,
        file: values.file,
      },
      {
        onSuccess: () => {
          form.reset({
            title: "",
            cert_type: CERTIFICATE_TYPES[0].value,
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload certificate</CardTitle>
        <CardDescription>
          Submit a certificate file for admin review. Accepted formats: PDF,
          images, or documents up to 10 MB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. IELTS 7.0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cert_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate type</FormLabel>
                  <FormControl>
                    <LabeledSelect
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select type"
                      options={CERTIFICATE_TYPES.map((t) => ({
                        value: t.value,
                        label: t.label,
                      }))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, ref, ...field } }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
                      ref={(el) => {
                        ref(el);
                        fileInputRef.current = el;
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      {...field}
                      value={undefined}
                    />
                  </FormControl>
                  {selectedFile instanceof File ? (
                    <p className="text-xs text-muted-foreground">
                      Selected: {selectedFile.name} (
                      {(selectedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={upload.isPending}>
              {upload.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <UploadIcon className="size-4" />
              )}
              Upload certificate
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
