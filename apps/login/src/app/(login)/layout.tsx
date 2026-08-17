import "@/styles/globals.css";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitch from "@/components/theme-switch";
import { LANGS, getLanguage } from "@/lib/i18n";
import { getServiceConfig } from "@/lib/service-url";
import { getAllowedLanguages } from "@/lib/zitadel";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // Next sólo sirve el favicon implícito en la raíz del dominio. Como la app va
  // montada bajo /ui/v2/login, el navegador pedía https://<dominio>/favicon.ico
  // y recibía un 404, dejando la pestaña con el icono genérico. Hay que
  // declararlos con el basePath por delante: Next no lo antepone en metadata.
  return {
    title: t("title"),
    icons: {
      icon: [
        { url: `${basePath}/unsch/icon-32.png`, sizes: "32x32", type: "image/png" },
        { url: `${basePath}/unsch/icon-192.png`, sizes: "192x192", type: "image/png" },
        { url: `${basePath}/favicon.ico`, sizes: "any" },
      ],
      apple: [{ url: `${basePath}/unsch/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  let languages = LANGS;
  try {
    const settings = await getAllowedLanguages({ serviceConfig });
    if (settings.allowedLanguages?.length) {
      languages = settings.allowedLanguages
        .filter((code) => LANGS.find((l) => l.code === code))
        .map((code) => getLanguage(code));
    }
  } catch (e) {
    console.error("Failed to load supported languages", e);
  }

  return (
    <html className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper
                  className={`bg-background-light-600 dark:bg-background-dark-600 relative flex min-h-dvh flex-col justify-center px-4`}
                >
                  <div className="relative mx-auto w-full max-w-[440px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                    <div className="flex flex-row items-center justify-end space-x-4 py-4">
                      <ThemeSwitch />
                    </div>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                {/* Estructura espejo de intranet LoginView: fondo a pantalla
                    completa, tarjeta centrada y controles flotando arriba a la
                    derecha. Se usa min-h-dvh (no h-screen) para que los pasos
                    largos del flujo —MFA, passkey— puedan hacer scroll. */}
                <BackgroundWrapper className="relative min-h-dvh w-full overflow-hidden">
                  {/* Fondo: réplica de login-background.tsx de la intranet —
                      fotografía a cover más un velo, en lugar de un gradiente
                      embebido en CSS. */}
                  <div className="absolute inset-0 bg-[url('/ui/v2/login/unsch/login.png')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-white/30 dark:bg-black/40" />

                  <div className="relative z-20 flex min-h-dvh w-full items-center justify-center px-4 pt-20 pb-10 sm:px-6 sm:py-16">
                    <div className="w-full max-w-5xl">{children}</div>
                  </div>

                  <div className="absolute top-4 right-4 z-50 flex flex-row items-center gap-2 sm:gap-3">
                    <LanguageSwitcher languages={languages} />
                    <ThemeSwitch />
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
