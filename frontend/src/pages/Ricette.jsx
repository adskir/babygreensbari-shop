import React from "react";
import { accentFor } from "../lib/theme";

const COCKTAILS = [
  {
    slug: "verde-detox",
    image: "/images/recipes/verde-detox.jpg",
    name: "Verde Detox",
    tagline: "Mela verde, cetriolo, piselli e menta",
    ingredients: [
      "1 mela verde",
      "1/2 cetriolo",
      "Un pugno di Piselli (Pea Shoots)",
      "Qualche foglia di menta",
      "Succo di 1/2 limone",
      "200 ml acqua fredda",
    ],
    steps: "Frulla tutti gli ingredienti insieme, filtra se preferisci una consistenza più liscia e servi subito con ghiaccio.",
  },
  {
    slug: "rosso-rubino",
    image: "/images/recipes/rosso-rubino.jpg",
    name: "Rosso Rubino",
    tagline: "Barbabietola, mela, Bietola Rossa e zenzero",
    ingredients: [
      "1 barbabietola cotta",
      "1 mela rossa",
      "Un pugno di Bietola Rossa",
      "1 cm di zenzero fresco",
      "200 ml acqua di cocco",
    ],
    steps: "Frulla fino a ottenere una consistenza omogenea. Il colore intenso arriva naturalmente da barbabietola e microgreens.",
  },
  {
    slug: "energia-piccante",
    name: "Energia Piccante",
    tagline: "Ananas, Ravanello Piccante e lime",
    ingredients: [
      "200 g ananas fresco",
      "Un pugno di Ravanello Piccante",
      "Succo di 1 lime",
      "150 ml acqua di cocco",
      "Un pizzico di peperoncino (facoltativo)",
    ],
    steps: "Frulla ananas, ravanello piccante e lime. Il tocco piccante del microgreen si bilancia con la dolcezza dell'ananas.",
  },
  {
    slug: "chef-arcobaleno",
    name: "Chef Arcobaleno",
    tagline: "Un mix dei nostri microgreens più colorati",
    ingredients: [
      "1 pera",
      "Un pugno misto di Amaranto Rosso, Shiso Rosso e Basilico",
      "200 ml acqua di cocco",
      "Succo di 1/2 lime",
    ],
    steps: "Frulla tutto insieme: il risultato è un verde intenso con riflessi porpora, tanto bello quanto ricco di nutrienti.",
  },
];

const RECIPES = [
  {
    slug: "tartare-ravanello",
    name: "Tartare di tonno con Ravanello Piccante",
    tagline: "Un antipasto veloce da ristorante, pronto in 15 minuti",
    ingredients: [
      "300 g tonno fresco di qualità sushi",
      "1 cucchiaio di salsa di soia",
      "1 cucchiaino di olio di sesamo",
      "1/2 avocado a cubetti",
      "Un pugno di Ravanello Piccante",
      "Semi di sesamo",
    ],
    steps: "Taglia il tonno a cubetti piccoli, condisci con soia e olio di sesamo. Componi con l'avocado e completa con abbondante Ravanello Piccante e semi di sesamo.",
  },
  {
    slug: "uova-crescione",
    image: "/images/recipes/uova-crescione.jpg",
    name: "Uova in camicia con Crescione",
    tagline: "La colazione gourmet del weekend",
    ingredients: [
      "2 uova",
      "1 fetta di pane a lievitazione naturale",
      "1 cucchiaio di aceto bianco",
      "Un pugno di Crescione",
      "Sale, pepe, olio extravergine",
    ],
    steps: "Cuoci le uova in camicia in acqua leggermente acidulata con aceto. Tosta il pane, adagia le uova e completa con Crescione, sale, pepe e un filo d'olio.",
  },
  {
    slug: "insalata-microgreens",
    name: "Insalata di microgreens con pesca, burrata e nocciole",
    tagline: "Un'insalata da ristorante, pronta in 10 minuti",
    ingredients: [
      "2 pugni abbondanti di microgreens misti (Basilico Genovese, Piselli, Girasole)",
      "1 pesca o nettarina a spicchi",
      "1 burrata",
      "Una manciata di nocciole tostate",
      "Olio extravergine, succo di limone, sale, pepe",
    ],
    steps: "Disponi i microgreens come base, aggiungi la pesca a spicchi e la burrata aperta al centro. Completa con nocciole spezzate, un filo d'olio, qualche goccia di limone, sale e pepe.",
  },
  {
    slug: "bruschetta-radicchio",
    name: "Bruschetta con burrata e Radicchio Variegato",
    tagline: "Il contrasto amaro-dolce che piace sempre",
    ingredients: [
      "4 fette di pane casereccio",
      "1 burrata",
      "Un pugno di Radicchio Variegato",
      "Miele di castagno",
      "Olio extravergine, sale",
    ],
    steps: "Tosta il pane, adagia la burrata aperta, completa con Radicchio Variegato, un filo di miele, olio e un pizzico di sale.",
  },
  {
    slug: "involtini-nasturzio",
    name: "Involtini di carta di riso con Nasturzio",
    tagline: "Freschi, croccanti e coloratissimi: perfetti per l'aperitivo",
    image: "/images/recipes/involtini-nasturzio.jpg",
    ingredients: [
      "6 fogli di carta di riso",
      "1 cetriolo e 1 carota a bastoncini",
      "1 avocado a fette",
      "Un pugno abbondante di Nasturzio",
      "Salsa di soia o salsa agrodolce per intingere",
    ],
    steps: "Ammorbidisci la carta di riso in acqua tiepida, farcisci con verdure, avocado e Nasturzio, arrotola stretto e taglia a metà. Servi su un letto di microgreens con i fiorellini in vista.",
  },  {
    slug: "caprese-senape",
    name: "Caprese con Senape Rossa e semi",
    tagline: "La caprese di sempre, con un tocco piccante e croccante",
    image: "/images/recipes/caprese-senape.jpg",
    ingredients: [
      "2 pomodori maturi",
      "1 mozzarella fiordilatte",
      "Un pugno di Senape Rossa",
      "1 cucchiaio di semi misti (lino, chia, sesamo)",
      "Olio extravergine, sale",
    ],
    steps: "Alterna fette di pomodoro e mozzarella a raggiera. Condisci con olio e sale, completa con Senape Rossa e una pioggia di semi.",
  },
  {
    slug: "avocado-toast-crescione",
    name: "Avocado toast con Crescione",
    tagline: "Il brunch più semplice, con una nota fresca e pepata",
    image: "/images/recipes/avocado-toast-crescione.jpg",
    ingredients: [
      "1 fetta di pane integrale",
      "1/2 avocado maturo",
      "1 cucchiaino di pesto o succo di limone",
      "Un pugno di Crescione",
      "Sale, pepe, olio extravergine",
    ],
    steps: "Tosta il pane e spalma un velo di pesto. Disponi l'avocado a fette sottili, condisci con sale, pepe e olio e completa con un ciuffo di Crescione.",
  },
  {
    slug: "toast-uova-ravanello",
    name: "Toast con uova barzotte e Ravanello Piccante",
    tagline: "Colazione proteica con un tocco di colore",
    image: "/images/recipes/toast-uova-ravanello.jpg",
    ingredients: [
      "2 fette di pane a lievitazione naturale",
      "2 uova",
      "1/2 avocado schiacciato",
      "Un pugno di Ravanello Piccante",
      "Sale, pepe nero",
    ],
    steps: "Cuoci le uova 6 minuti in acqua bollente, raffreddale e sgusciale. Spalma l'avocado sul pane tostato, adagia le uova tagliate a metà e completa con Ravanello Piccante, sale e pepe.",
  },
];

function RecipeCard({ item, badge }) {
  const accent = accentFor(item.slug);
  return (
    <div className="bg-white rounded-2xl border border-forest-200 overflow-hidden flex flex-col">
      <div
        className={`aspect-[4/3] bg-gradient-to-br ${accent.bg} flex items-end p-4 bg-cover bg-center`}
        style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
        role={item.image ? "img" : undefined}
        aria-label={item.image ? item.name : undefined}
      >
        <span className={`${accent.tag} text-white text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full`}>
          {badge}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-semibold text-forest-900 mb-1">{item.name}</h3>
        <p className="text-sm text-forest-500 mb-4">{item.tagline}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-clay-600 mb-2">Ingredienti</p>
        <ul className="text-sm text-forest-700 space-y-1 mb-4 list-disc list-inside">
          {item.ingredients.map((ing) => (
            <li key={ing}>{ing}</li>
          ))}
        </ul>
        <p className="text-xs font-semibold uppercase tracking-wide text-clay-600 mb-2">Preparazione</p>
        <p className="text-sm text-forest-700 leading-relaxed">{item.steps}</p>
      </div>
    </div>
  );
}

export default function Ricette() {
  return (
    <div className="container-page py-14">
      <div className="mb-10 text-center max-w-xl mx-auto">
        <span className="text-clay-600 text-xs font-semibold uppercase tracking-wide">Ricette</span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-forest-900 mt-2">
          Idee in cucina con i nostri microgreens
        </h1>
        <p className="text-forest-600 mt-3 leading-relaxed">
          Le foto qui sotto sono placeholder in stile Baby Greens Bari — verranno
          sostituite con scatti reali non appena pronti.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="font-display text-2xl font-semibold text-forest-900 mb-6">
          Cocktail verdi
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COCKTAILS.map((c) => (
            <RecipeCard key={c.slug} item={c} badge="Cocktail" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-forest-900 mb-6">
          Ricette con i nostri microgreens
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {RECIPES.map((r) => (
            <RecipeCard key={r.slug} item={r} badge="Ricetta" />
          ))}
        </div>
      </section>
    </div>
  );
}
