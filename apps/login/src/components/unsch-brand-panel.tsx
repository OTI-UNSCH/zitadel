import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

/**
 * Réplica de intranet-frontend/src/features/auth/components/login-form-right.tsx.
 * Los tamaños con clamp() y los valores de opacidad se copian tal cual para que
 * el panel sea indistinguible del de la intranet.
 */
const contactItems = [
  {
    icon: EnvelopeIcon,
    title: "Correo Institucional",
    value: "software@unsch.edu.pe",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: MapPinIcon,
    title: "Ubicación",
    value: "VQ3J+265, Ayacucho 05001",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

// Escalas tipográficas fluidas de la intranet.
const TEXT_MICRO = "text-[clamp(0.5rem,0.3rem+0.3vw,0.9rem)]";
const TEXT_LABEL = "text-[clamp(0.5625rem,0.4rem+0.35vw,1rem)]";
const TEXT_BODY = "text-[clamp(0.625rem,0.3rem+0.5vw,1.5rem)]";

/**
 * Barra de marca compacta para <lg, donde el panel lateral no se muestra.
 * No existe en la intranet (allí el login ocupa siempre el alto completo),
 * pero aquí evita que móvil y tablet se queden sin identidad institucional.
 */
export function UnschBrandHeader() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="mb-6 flex items-center gap-3 sm:mb-8 lg:hidden">
      <Image
        src={`${basePath}/unsch/logo.png`}
        alt="UNSCH Logo"
        width={48}
        height={48}
        className="h-10 w-10 object-contain sm:h-12 sm:w-12"
      />
      <div className="h-8 w-px bg-unsch-border" />
      <div className="flex min-w-0 flex-col">
        <p className={`${TEXT_LABEL} mb-0.5 leading-none font-black tracking-[0.35em] text-unsch-primary uppercase`}>
          UNSCH · OTI
        </p>
        <p className={`${TEXT_BODY} truncate leading-none text-unsch-fg/80`}>Plataforma Institucional</p>
      </div>
    </div>
  );
}

export function UnschBrandPanel() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-unsch-primary/8 via-unsch-bg to-unsch-primary/5 px-8 py-10 lg:flex xl:px-12 xl:py-14">
      {/* Capa decorativa: hairlines en los bordes, halos difuminados y esquinas. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-unsch-fg/4 via-unsch-bg to-unsch-fg/3 dark:from-white/5 dark:via-unsch-bg dark:to-white/2" />
        <div className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-unsch-fg/10 to-transparent dark:via-white/20" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-unsch-fg/8 to-transparent dark:via-white/10" />
        <div className="absolute top-0 left-0 h-full w-px bg-linear-to-b from-transparent via-unsch-fg/8 to-transparent dark:via-white/15" />
        <div className="absolute top-0 right-0 h-full w-px bg-linear-to-b from-unsch-fg/5 via-unsch-fg/3 to-transparent dark:from-white/10 dark:via-white/5" />
        <div className="absolute -top-40 -right-40 h-125 w-125 rounded-full bg-unsch-primary/8 blur-[130px] dark:bg-unsch-primary/5" />
        <div className="absolute -bottom-40 -left-40 h-100 w-100 rounded-full bg-unsch-primary/10 blur-[110px] dark:bg-unsch-primary/8" />
        <div className="absolute top-1/3 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-unsch-fg/3 blur-[80px] dark:bg-white/3" />
        <div className="absolute top-0 left-0 h-40 w-40 rounded-br-full bg-linear-to-br from-unsch-fg/8 to-transparent dark:from-white/8" />
        <div className="absolute right-0 bottom-0 h-32 w-32 rounded-tl-full bg-linear-to-tl from-unsch-fg/5 to-transparent dark:from-white/5" />
      </div>

      <div className="relative flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center">
          <Image src={`${basePath}/unsch/logo.png`} alt="UNSCH Logo" width={64} height={64} className="object-contain" />
        </div>
        <div className="h-8 w-px bg-white/15" />
        <div className="flex flex-col">
          <p className={`${TEXT_LABEL} mb-0.5 leading-none font-black tracking-[0.35em] text-unsch-primary uppercase`}>
            UNSCH · OTI
          </p>
          <p className={`${TEXT_BODY} leading-none text-unsch-fg/80`}>Plataforma Institucional</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-7">
        <div className="inline-flex items-center gap-2">
          <div className="h-px w-5 bg-unsch-primary/60" />
          <p className={`${TEXT_MICRO} font-black tracking-[0.35em] text-unsch-primary uppercase`}>
            Acceso institucional
          </p>
        </div>

        <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-[0.95] font-black tracking-tighter text-unsch-fg drop-shadow-sm">
          El conocimiento
          <br />
          <span className="text-unsch-primary">sin fronteras</span>
        </h2>

        <p className={`${TEXT_BODY} max-w-xs border-l border-unsch-primary/25 pl-3 leading-relaxed text-unsch-fg/60`}>
          Portal de acceso para estudiantes, docentes y personal administrativo de la UNSCH.
        </p>
      </div>

      <div className="relative flex flex-col gap-2">
        {contactItems.map(({ icon: Icon, title, value, color, bg }) => (
          <div
            key={title}
            className="group flex items-center gap-3 rounded-xl border border-unsch-border/50 bg-unsch-bg/50 p-3.5 shadow-sm shadow-black/3 backdrop-blur-sm transition-all duration-300 hover:border-unsch-border hover:bg-unsch-bg/80"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
              <Icon className={`h-3.5 w-3.5 ${color}`} />
            </div>
            <div className="flex min-w-0 flex-col">
              <p className={`${TEXT_LABEL} mb-0.5 leading-none font-black tracking-widest text-unsch-muted-fg/70 uppercase`}>
                {title}
              </p>
              <p className={`${TEXT_BODY} truncate font-semibold text-unsch-fg/80`}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-between border-t border-white/10 pt-5">
        <span className={`${TEXT_MICRO} font-black tracking-[0.3em] text-unsch-fg/50 uppercase`}>
          © {new Date().getFullYear()} UNSCH
        </span>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
          <span className={`${TEXT_MICRO} font-bold tracking-widest text-unsch-fg/50 uppercase`}>
            Sistema activo
          </span>
        </div>
      </div>
    </div>
  );
}
