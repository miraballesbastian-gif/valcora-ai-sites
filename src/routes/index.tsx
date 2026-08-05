import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  MessageCircle,
  Facebook,
  MapPin,
  Zap,
  Sparkles,
  Users,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import logo from "@/assets/valcora-logo.png.asset.json";
import refugioVideo from "@/assets/Refugio-Verde-Final.mp4.asset.json";
import costaVideo from "@/assets/Hotel-CostaSerena-Final.mp4.asset.json";
import fuegoVideo from "@/assets/Fuego-urbano-demo.mp4.asset.json";

const WA_MSG = "Hola, quiero más información sobre los planes de Valcora Studio";
const WA_LINK = `https://wa.me/59894233657?text=${encodeURIComponent(WA_MSG)}`;
const FB_LINK = "https://www.facebook.com/profile.php?id=61590887863016";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valcora Studio — Sitios web con IA para pymes en Uruguay" },
      {
        name: "description",
        content:
          "Estudio freelance en Melo, Cerro Largo. Diseñamos sitios web profesionales, rápidos y a medida para pequeñas y medianas empresas uruguayas.",
      },
      { property: "og:title", content: "Valcora Studio — Sitios web con IA para pymes en Uruguay" },
      {
        property: "og:description",
        content:
          "Estudio freelance en Melo, Cerro Largo. Diseñamos sitios web profesionales, rápidos y a medida para pequeñas y medianas empresas uruguayas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "proyectos", label: "Proyectos" },
  { id: "planes", label: "Planes" },
  { id: "porque", label: "Por qué Valcora" },
  { id: "contacto", label: "Contacto" },
];

const PROJECTS = [
  {
    name: "Refugio Verde",
    sector: "Hotel, cabañas y camping",
    video: refugioVideo.url,
    features: [
      "Reservas por WhatsApp con mensaje precargado",
      "Formulario con selector de fechas (desde/hasta) y tipo de alojamiento",
      "Galería filtrable por categoría (habitaciones, cabañas, camping, piscina)",
      "Sección de preguntas frecuentes",
      "Mapa de ubicación integrado",
    ],
  },
  {
    name: "Hotel Costa Serena",
    sector: "Hotel boutique",
    video: costaVideo.url,
    features: [
      "Selector de idioma (🇪🇸 ES visible en el header)",
      "Reservas por WhatsApp",
      "Formulario de consulta de disponibilidad (check-in/check-out, huéspedes, tipo de habitación)",
      "Mapa con cómo llegar",
      "Sección de reseñas de huéspedes",
    ],
  },
  {
    name: "Fuego Urbano",
    sector: "Delivery de comida",
    video: fuegoVideo.url,
    features: [
      "Menú completo con categorías (burgers, chivitos, pizzetas, milanesas)",
      "Carrito de compra",
      "Pedidos directos por WhatsApp",
      "Horario de atención visible",
      "Link a Instagram",
    ],
  },
];

const PLANS = [
  {
    id: "basico",
    name: "Plan Básico",
    price: "USD 350",
    note: "pago único",
    featured: false,
    features: [
      "Sitio de hasta 5 secciones",
      "Diseño responsive",
      "Botón de WhatsApp integrado",
      "Publicación configurada",
      "1 ronda de ajustes",
    ],
  },
  {
    id: "pro",
    name: "Plan Pro",
    price: "USD 450–500",
    note: "pago único",
    featured: true,
    features: [
      "Todo lo del Básico",
      "Secciones extra o página adicional",
      "SEO básico (meta tags, estructura)",
      "2 rondas de ajustes",
    ],
  },
];

const WHY = [
  { icon: Zap, title: "Entrega rápida", text: "Tu sitio online en días, no en meses." },
  { icon: Users, title: "Foco en pymes locales", text: "Entendemos al negocio uruguayo y a su cliente." },
  { icon: Sparkles, title: "Diseño moderno con IA", text: "Procesos asistidos por IA, criterio humano en cada detalle." },
  { icon: HeartHandshake, title: "Atención directa", text: "Hablás siempre con quien hace el trabajo." },
];

function LaptopMockup({ src, label }: { src: string; label: string }) {
  return (
    <div className="w-full">
      <div className="rounded-t-xl border border-border bg-ink p-2 pb-0 sm:p-3 sm:pb-0">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="h-2 w-2 rounded-full bg-sand/40" />
          <span className="h-2 w-2 rounded-full bg-sand/25" />
        </div>
        <div className="grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-t-md bg-secondary">
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`Demo del sitio ${label}`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[112%] max-w-none -translate-x-[5.3%] rounded-b-lg bg-ink/85" />
    </div>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [plan, setPlan] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const choosePlan = (name: string) => {
    setPlan(name);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const planOptions = useMemo(() => ["Plan Básico", "Plan Pro", "Mantenimiento mensual", "Todavía no lo sé"], []);

  return (
    <div className="min-h-screen">
      <Toaster />

      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <img src={logo.url} alt="Valcora Studio" className="h-9 w-9 shrink-0 object-contain mix-blend-multiply sm:h-10 sm:w-10" />
            <span className="truncate font-display text-base font-bold tracking-tight sm:text-lg">
              Valcora <span className="text-muted-foreground font-medium">Studio</span>
            </span>
          </a>
          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="ml-1 inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="grain-bg relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <img src={logo.url} alt="Valcora Studio" className="mx-auto h-28 w-auto object-contain mix-blend-multiply sm:h-36" />
          </Reveal>
          <Reveal delay={90}>
            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Estudio web · Melo, Uruguay
            </span>
          </Reveal>
          <Reveal delay={160}>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Sitios web profesionales para tu negocio, hechos con IA
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Rápido, moderno y a medida. Diseñamos sitios pensados para pymes locales: claros,
              livianos y listos para convertir visitas en clientes.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#planes"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                Ver planes <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#proyectos"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary sm:w-auto"
              >
                Ver proyectos
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="border-t border-border px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">01 — Trabajo</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-5xl">Proyectos destacados</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Demos funcionales que muestran cómo resolvemos reservas, pedidos y consultas reales.
            </p>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 110} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Proyecto conceptual — no afiliado
                  </span>
                  <LaptopMockup src={p.video} label={p.name} />
                  <div className="mt-6">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    <p className="mt-1 text-sm text-primary">{p.sector}</p>
                  </div>
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="border-t border-border bg-sand/60 px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">02 — Planes</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">Precios claros, sin sorpresas</h2>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
            {PLANS.map((pl, i) => (
              <Reveal key={pl.id} delay={i * 110} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border p-7 ${
                    pl.featured
                      ? "border-ink bg-ink text-background shadow-lift"
                      : "border-border bg-card shadow-soft"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`text-xl font-bold ${pl.featured ? "text-background" : ""}`}>{pl.name}</h3>
                    {pl.featured && (
                      <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                        Más elegido
                      </span>
                    )}
                  </div>
                  <p className="mt-5 font-display text-4xl font-extrabold">{pl.price}</p>
                  <p className={`mt-1 text-sm ${pl.featured ? "text-background/60" : "text-muted-foreground"}`}>
                    {pl.note}
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {pl.features.map((f) => (
                      <li
                        key={f}
                        className={`flex gap-2.5 text-sm ${pl.featured ? "text-background/85" : "text-muted-foreground"}`}
                      >
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${pl.featured ? "text-primary" : "text-accent"}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => choosePlan(pl.name)}
                    className={`mt-8 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                      pl.featured
                        ? "bg-primary text-primary-foreground"
                        : "bg-ink text-background"
                    }`}
                  >
                    Elegir este plan
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-6 grid gap-2 rounded-2xl border border-dashed border-ink/25 bg-card px-6 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0">
                <p className="font-semibold">Mantenimiento mensual (opcional)</p>
                <p className="text-sm text-muted-foreground">
                  Cambios de texto/imágenes y ajustes menores.
                </p>
              </div>
              <p className="font-display text-lg font-bold text-primary">USD 15–25/mes</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POR QUÉ */}
      <section id="porque" className="border-t border-border px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">03 — Nosotros</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">Por qué Valcora Studio</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 90} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary">
                    <w.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="grain-bg border-t border-border px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">04 — Contacto</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">Contanos sobre tu proyecto</h2>
          </Reveal>

          <Reveal delay={100}>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("¡Consulta enviada! Te respondemos a la brevedad.");
                formRef.current?.reset();
                setPlan("");
              }}
              className="mt-10 grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Nombre
                  <input
                    name="nombre"
                    required
                    maxLength={100}
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="Tu nombre"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email o WhatsApp
                  <input
                    name="contacto"
                    required
                    maxLength={120}
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="nombre@correo.com / 09x xxx xxx"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                Plan de interés
                <select
                  name="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="">Seleccioná un plan</option>
                  {planOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Mensaje
                <textarea
                  name="mensaje"
                  rows={4}
                  maxLength={1000}
                  className="rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Contanos qué necesitás"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Enviar consulta
              </button>
            </form>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> Escribinos por WhatsApp
              </a>
              <a
                href={FB_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <Facebook className="h-4 w-4" /> Escribinos por Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo.url} alt="Valcora Studio" className="h-10 w-10 shrink-0 object-contain mix-blend-multiply" />
            <div className="min-w-0">
              <p className="font-display font-bold">Valcora Studio</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" /> Melo, Cerro Largo, Uruguay
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={FB_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} Valcora Studio. Los proyectos mostrados son conceptuales y no
          están afiliados a marcas reales.
        </p>
      </footer>
    </div>
  );
}
