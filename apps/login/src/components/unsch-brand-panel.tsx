import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const contactItems = [
  {
    icon: EnvelopeIcon,
    label: "Correo institucional",
    value: "software@unsch.edu.pe",
    iconClassName: "bg-sky-500/10 text-sky-500",
  },
  {
    icon: MapPinIcon,
    label: "Ubicación",
    value: "VQ3J+265, Ayacucho 05001",
    iconClassName: "bg-emerald-500/10 text-emerald-500",
  },
];

export function UnschBrandPanel() {
  return (
    <aside className="unsch-brand-panel relative hidden flex-col justify-between overflow-hidden px-12 py-12 lg:flex">
      <div className="unsch-brand-glow pointer-events-none absolute inset-0" />

      <div className="relative flex items-center gap-3">
        <Image src="/unsch/logo.png" alt="Logo de la UNSCH" width={64} height={64} className="object-contain" />
        <div className="h-8 w-px bg-current opacity-15" />
        <div>
          <p className="text-primary-light-500 dark:text-primary-dark-500 text-xs font-black tracking-[0.35em] uppercase">
            UNSCH · OTI
          </p>
          <p className="text-sm opacity-70">Plataforma Institucional</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary-light-500 dark:bg-primary-dark-500 h-px w-5 opacity-60" />
          <p className="text-primary-light-500 dark:text-primary-dark-500 text-[0.65rem] font-black tracking-[0.35em] uppercase">
            Acceso institucional
          </p>
        </div>
        <h2 className="text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">
          El conocimiento
          <br />
          <span className="text-primary-light-500 dark:text-primary-dark-500">sin fronteras</span>
        </h2>
        <p className="border-primary-light-500/25 dark:border-primary-dark-500/25 max-w-sm border-l pl-3 text-sm leading-relaxed opacity-60">
          Portal de acceso para estudiantes, docentes y personal administrativo de la UNSCH.
        </p>
      </div>

      <div className="relative flex flex-col gap-2">
        {contactItems.map(({ icon: Icon, label, value, iconClassName }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border border-black/5 bg-white/45 p-3.5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/15"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.6rem] font-black tracking-widest uppercase opacity-50">{label}</p>
              <p className="truncate text-sm font-semibold opacity-80">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-between border-t border-black/5 pt-5 text-[0.6rem] font-black tracking-[0.25em] uppercase opacity-50 dark:border-white/10">
        <span>© {new Date().getFullYear()} UNSCH</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
          Sistema activo
        </span>
      </div>
    </aside>
  );
}
