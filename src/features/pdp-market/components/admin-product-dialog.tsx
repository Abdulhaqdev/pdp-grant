"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LabeledSelect } from "@/components/admin/labeled-select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProductImageThumb } from "@/features/pdp-market/components/product-image-thumb";
import { PDP_MARKET_IMAGE_OPTIONS } from "@/features/pdp-market/lib/product-image";
import type { MarketProduct } from "@/types/pdp-market";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  price: z.number().int().positive("Price must be positive"),
  image: z.string().min(1, "Image is required").max(200),
  description: z.string().max(300).optional(),
  active: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface AdminProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: MarketProduct | null;
  onSubmit: (values: ProductFormValues & { id?: number }) => void;
  loading?: boolean;
}

export function AdminProductDialog({
  open,
  onOpenChange,
  product,
  onSubmit,
  loading,
}: AdminProductDialogProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 100,
      image: PDP_MARKET_IMAGE_OPTIONS[0].value,
      description: "",
      active: true,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: product?.name ?? "",
        price: product?.price ?? 100,
        image: product?.image ?? PDP_MARKET_IMAGE_OPTIONS[0].value,
        description: product?.description ?? "",
        active: product?.active !== false,
      });
    }
  }, [open, product, form]);

  function handleSubmit(values: ProductFormValues) {
    onSubmit(product ? { ...values, id: product.id } : values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? "Edit product" : "Add product"}</DialogTitle>
          <DialogDescription>
            Shared catalog — students see the same products from this list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="PDP Portfolio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (points)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product image</FormLabel>
                  <div className="flex items-center gap-3">
                    <ProductImageThumb
                      src={field.value}
                      alt="Preview"
                      size={72}
                    />
                    <FormControl className="flex-1">
                      <LabeledSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select image"
                        options={PDP_MARKET_IMAGE_OPTIONS.map((o) => ({
                          value: o.value,
                          label: o.label,
                        }))}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel>Visible in student catalog</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : null}
                {product ? "Save" : "Add product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
