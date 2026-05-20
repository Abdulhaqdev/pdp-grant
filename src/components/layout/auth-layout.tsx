import { PdpLogo } from "@/components/brand/pdp-logo";
import { BRAND } from "@/constants/brand";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      {/* Brand panel */}
      <div
        className="relative hidden flex-col overflow-hidden lg:flex"
        style={{
          background: `linear-gradient(160deg, ${BRAND.colors.tealDark} 0%, ${BRAND.colors.teal} 45%, ${BRAND.colors.tealLight} 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full border-[28px] border-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 size-[360px] rounded-full bg-[#FFCC19]/20 blur-2xl"
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-12 py-16 text-center">
          <PdpLogo
            variant="mark"
            size="xl"
            priority
            className="drop-shadow-lg"
          />
          <h2 className="mt-10 font-heading text-3xl font-bold tracking-tight text-white">
            {BRAND.shortName} Grant LMS
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/85">
            Talabalar, mentorlar va grant dasturlarini boshqarish platformasi
          </p>
          <div className="mt-10 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-[#FFCC19]" />
            {BRAND.name}
          </div>
        </div>

        <p className="relative z-10 px-12 pb-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {BRAND.name}
        </p>
      </div>

      {/* Login panel */}
      <div className="relative flex flex-col items-center justify-center bg-[var(--background)] px-6 py-10 sm:px-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 10%, ${BRAND.colors.teal}18 0%, transparent 45%), radial-gradient(circle at 80% 90%, ${BRAND.colors.yellow}22 0%, transparent 40%)`,
          }}
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-[420px]">
          <div className="mb-8 flex flex-col items-center text-center lg:mb-10">
            <PdpLogo variant="full" size="md" priority className="lg:hidden" />
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--pdp-navy)]">
              Tizimga kirish
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Email yoki telefon raqam va parolingizni kiriting
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
