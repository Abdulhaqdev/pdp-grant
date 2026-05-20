import { GraduationCapIcon } from "lucide-react";
import Link from "next/link";

import { APP_CONFIG } from "@/constants/config";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <Link href="/" className="relative z-10 flex items-center gap-2 font-semibold">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15">
            <GraduationCapIcon className="size-5" />
          </div>
          <span className="text-lg">{APP_CONFIG.name}</span>
        </Link>
        <div className="relative z-10 max-w-md space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Empower learning at scale
          </h2>
          <p className="text-primary-foreground/80">
            Manage students, mentors, groups, and certifications in one modern
            platform built for grant programs.
          </p>
        </div>
        <p className="relative z-10 text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} {APP_CONFIG.name}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCapIcon className="size-4" />
          </div>
          <span className="font-semibold">{APP_CONFIG.name}</span>
        </div>
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
