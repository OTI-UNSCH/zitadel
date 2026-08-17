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
      <div className="unsch-login-card relative mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-xl bg-white/50 sm:rounded-2xl lg:grid-cols-2 dark:bg-neutral-950/50">
        <main className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:min-h-[560px] lg:p-10 xl:min-h-[620px]">
          <div className="mx-auto w-full max-w-[400px]">
            {/* Kept outside the space-y container: `lg:hidden` removes its box
                entirely, so no phantom gap is left above the title on desktop. */}
            <UnschBrandHeader />
            <div className="space-y-6 sm:space-y-8 [&_h1]:text-left [&_h1]:text-2xl [&_h1]:font-black sm:[&_h1]:text-3xl [&_p]:text-left">
              {actualChildren}
            </div>
          </div>
        </main>
        <UnschBrandPanel />
      </div>
    </ThemeWrapper>
  );
}
