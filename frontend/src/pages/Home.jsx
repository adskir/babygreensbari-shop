import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import ProductCard from "../components/ProductCard.jsx";

const TRUST_ITEMS = [
  { title: "Raccolto in giornata", desc: "Tagliato poche ore prima della consegna, mai in cella da giorni." },
  { title: "Zero pesticidi", desc: "Coltivazione idroponica indoor, solo acqua e luce controllata." },
  { title: "Packaging compostabile", desc: "Vaschette in fibra vegetale, niente plastica monouso." },
  { title: "Consegna a Bari in 24h", desc: "Ordini entro le 18:00, ricevi il giorno dopo in tutta la città." },
];

const STEPS = [
  { n: "01", title: "Scegli i tuoi microgreens", desc: "Piccanti, dolci o in un mix da chef: scegli dal catalogo o abbonati a una box." },
  { n: "02", title: "Raccogliamo su ordinazione", desc: "Ogni vaschetta viene tagliata a mano il giorno stesso dell'ordine, nella nostra serra a Bari." },
  { n: "03", title: "Arriva fresco a casa tua", desc: "Consegna refrigerata entro 24 ore, pronta da aprire e usare in cucina." },
];

const TESTIMONIALS = [
  { quote: "La differenza si sente al primo morso: colore, croccantezza, sapore vero. Li uso su ogni piatto del menù.", author: "Chef, ristorante a Bari Vecchia" },
  { quote: "Consegna puntualissima e freschezza incredibile. Il mix piccante è diventato un'abitudine settimanale.", author: "Cliente privato, Bari" },
  { quote: "Finalmente microgreens locali e non importati dal nord. Qualità da fine dining a un prezzo giusto.", author: "Food blogger pugliese" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listProducts({ pageSize: 4, sort: "newest" })
      .then((data) => setProducts(data.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest-800 text-cream-100">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 800 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="650" cy="120" r="260" fill="#c1743f" />
            <circle cx="80" cy="700" r="220" fill="#94b69d" />
          </svg>
        </div>

        <div className="container-page relative py-20 sm:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-forest-700/60 border border-forest-600 text-clay-300 text-xs font-medium tracking-wide uppercase px-3 py-1 rounded-full mb-6">
              Coltivati e raccolti a Bari
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.1] mb-5">
              Microgreens freschissimi,<br /> dalla serra alla tua tavola.
            </h1>
            <p className="text-forest-200 text-lg leading-relaxed mb-8 max-w-md">
              Concentrato di sapore, colore e nutrienti: coltiviamo le nostre
              varietà indoor a Bari e le consegniamo entro 24 ore dal
              raccolto.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="bg-clay-500 hover:bg-clay-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                Scopri il catalogo
              </Link>
              <a
                href="#storia"
                className="border border-forest-500 hover:border-clay-400 text-cream-100 font-medium px-6 py-3 rounded-full transition-colors"
              >
                La nostra storia
              </a>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-forest-600 to-forest-900 border border-forest-600 shadow-soft flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" fill="none" stroke="#f4ecd9" strokeWidth="2.2" strokeLinecap="round">
                <path d="M100 176 C100 176 100 120 100 96 C100 56 68 32 24 32 C24 32 24 84 56 100 C72 108 100 112 100 112" />
                <path d="M100 96 C100 64 124 40 172 40 C172 40 174 78 148 92 C136 100 100 104 100 104" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream-100 text-forest-900 rounded-2xl shadow-soft px-5 py-4 w-52">
              <p className="text-xs uppercase tracking-wide text-forest-500 font-medium mb-1">
                Raccolto stamattina
              </p>
              <p className="font-display text-lg font-semibold leading-tight">
                Ravanello Piccante
              </p>
              <p className="text-clay-600 font-semibold mt-1">€3,90</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-forest-200">
        <div className="container-page py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title}>
              <h3 className="font-display font-semibold text-forest-800 mb-1">{item.title}</h3>
              <p className="text-sm text-forest-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">Novità</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest-900 mt-1">
              I preferiti della settimana
            </h2>
          </div>
          <Link to="/catalog" className="hidden sm:inline text-sm font-medium text-forest-700 hover:text-clay-600">
            Vedi tutto →
          </Link>
        </div>

        {loading ? (
          <p className="text-forest-500">Caricamento...</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Story */}
      <section id="storia" className="bg-forest-50 border-y border-forest-200">
        <div className="container-page py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-forest-200 to-forest-400 shadow-card flex items-center justify-center order-2 md:order-1">
            <svg viewBox="0 0 200 140" className="w-3/4" fill="none" stroke="#2d4f3a" strokeWidth="1.6" strokeLinecap="round">
              <path d="M20 120 Q20 60 60 60 Q60 20 100 20 Q140 20 140 60 Q180 60 180 120" />
              <path d="M20 120h160" />
            </svg>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">La nostra storia</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest-900 mt-2 mb-5">
              Nata in una piccola serra urbana, cresciuta con i ristoranti di Bari
            </h2>
            <p className="text-forest-700 leading-relaxed mb-4">
              Baby Greens Bari nasce dall'idea di portare microgreens di
              qualità da fine dining fuori dalle cucine stellate. Abbiamo
              iniziato coltivando poche vaschette per alcuni ristoranti del
              centro storico; oggi riforniamo chef e famiglie in tutta la
              città, sempre con lo stesso principio: raccolta il giorno
              dell'ordine, zero compromessi sulla freschezza.
            </p>
            <p className="text-forest-700 leading-relaxed">
              Ogni varietà viene coltivata indoor, in acqua, senza terra né
              pesticidi — solo luce, tempo e attenzione.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">Come funziona</span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest-900 mt-2">
            Dalla serra al piatto in tre passaggi
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-white border border-forest-200 rounded-2xl p-6 shadow-card">
              <span className="font-display text-3xl text-clay-500 font-semibold">{step.n}</span>
              <h3 className="font-display text-lg font-semibold text-forest-900 mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-forest-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-forest-800 text-cream-100">
        <div className="container-page py-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-clay-400 text-xs font-semibold uppercase tracking-wide">Chi ci ha già scelto</span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-2">
              Dalle cucine dei ristoranti alle case di Bari
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.author} className="bg-forest-700/60 border border-forest-600 rounded-2xl p-6">
                <p className="leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <footer className="text-sm text-forest-300">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest-900 mb-4">
          Pronto a sentire la differenza?
        </h2>
        <p className="text-forest-600 mb-8 max-w-md mx-auto">
          Ordina entro le 18:00 e ricevi i tuoi microgreens freschissimi domani.
        </p>
        <Link
          to="/catalog"
          className="inline-block bg-forest-800 hover:bg-forest-900 text-white font-medium px-8 py-3 rounded-full transition-colors"
        >
          Vai al catalogo
        </Link>
      </section>
    </div>
  );
}
