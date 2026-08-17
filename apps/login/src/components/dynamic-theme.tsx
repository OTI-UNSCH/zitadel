"use client";

import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import React, { ReactNode } from "react";
import { ThemeWrapper } from "./theme-wrapper";
import { UnschBrandHeader, UnschBrandPanel } from "./unsch-brand-panel";

/**
 * DynamicTheme component handles layout switching between traditional top-to-bottom
 * and modern side-by-side layouts based on NEXT_PUBLIC_THEME_LAYOUT.
 *
 * For side-by-side layout:
 * - First child: Goes to left side (title, description, etc.)
 * - Second child: Goes to right side (forms, buttons, etc.)
 * - Single child: Falls back to right side for backward compatibility
 *
 * For top-to-bottom layout:
 * - All children rendered in traditional centered layout
 */
export function DynamicTheme({
  branding,
  children,
}: {
  children: ReactNode | ((isSideBySide: boolean) => ReactNode);
  branding?: BrandingSettings;
}) {
  const actualChildren: ReactNode = React.useMemo(() => {
    if (typeof children === "function") {
      return (children as (isSideBySide: boolean) => ReactNode)(true);
    }
    return children;
  }, [children]);

  return (
    <ThemeWrapper branding={branding}>
      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
        <main className="flex min-w-0 flex-col justify-center border-unsch-border/30 bg-unsch-bg p-4 backdrop-blur-xl sm:p-8 lg:min-h-[560px] lg:border-r xl:min-h-[620px]">
          <div className="mx-auto w-full max-w-[400px]">
            {/* Fuera del contenedor space-y: `lg:hidden` elimina su caja por
                completo, así no deja un hueco fantasma sobre el título. */}
            <UnschBrandHeader />

            {/* Píldora de login-header.tsx de la intranet. */}
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-unsch-primary/20 bg-unsch-primary/10 px-3 py-1 sm:mb-6">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-unsch-primary" />
              <span className="text-[clamp(0.5625rem,0.53rem+0.15vw,0.6875rem)] font-bold tracking-[0.25em] text-unsch-primary uppercase">
                Plataforma Académica
              </span>
            </span>

            <div className="unsch-form space-y-6 sm:space-y-8">{actualChildren}</div>

            {/* login-footer.tsx de la intranet. */}
            <div className="mt-4 border-t border-unsch-border/20 pt-2">
              <p className="text-center text-[clamp(0.6875rem,0.65rem+0.15vw,0.75rem)] text-unsch-muted-fg/40">
                ¿Problemas de acceso?{" "}
                <a
                  href="mailto:software@unsch.edu.pe"
                  className="font-semibold text-unsch-primary/70 transition-colors hover:text-unsch-primary"
                >
                  Contacta soporte
                </a>
              </p>
            </div>
          </div>
        </main>
        <UnschBrandPanel />
      </div>
    </ThemeWrapper>
  );
}
