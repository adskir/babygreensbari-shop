const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@babygreensbari.it";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.create({ data: { email: adminEmail, passwordHash } });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log(`Admin user ${adminEmail} already exists, skipping.`);
  }

  const categories = [
    { name: "Microgreens piccanti", slug: "piccanti" },
    { name: "Microgreens dolci", slug: "dolci" },
    { name: "Kit degustazione", slug: "kit-degustazione" },
    { name: "Kit da coltivare", slug: "kit-coltivazione" },
  ];

  const categoryRecords = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categoryRecords[c.slug] = cat;
  }

  const products = [
    {
      name: "Ravanello Piccante",
      slug: "ravanello-piccante",
      description:
        "Microgreens di ravanello dal gusto deciso e leggermente piccante, con steli rosati e foglie verde brillante. Perfetti su tartare, uova e piatti a base di pesce crudo.",
      price: 390,
      stock: 18,
      images: ["/images/products/ravanello-piccante.jpg"],
      categorySlug: "piccanti",
    },
    {
      name: "Senape Rossa",
      slug: "senape-rossa",
      description:
        "Colore rosso intenso e sapore pungente simile al wasabi. Un tocco scenico e deciso per piatti di carne, tartare e taglieri gourmet.",
      price: 420,
      stock: 14,
      images: ["/images/products/senape-rossa.jpg"],
      categorySlug: "piccanti",
    },
    {
      name: "Rucola Selvatica",
      slug: "rucola-selvatica",
      description:
        "Versione in miniatura della rucola che conosci, con un aroma ancora più concentrato e note pepate. Ottima su pizze, bruschette e primi piatti.",
      price: 360,
      stock: 22,
      images: ["/images/products/rucola-selvatica.jpg"],
      categorySlug: "piccanti",
    },
    {
      name: "Piselli (Pea Shoots)",
      slug: "piselli-pea-shoots",
      description:
        "Germogli di pisello dolci e croccanti, con un sapore fresco che ricorda i piselli appena sgranati. Ideali crudi in insalata o saltati in padella all'ultimo minuto.",
      price: 350,
      stock: 25,
      images: ["/images/products/piselli-pea-shoots.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Girasole",
      slug: "girasole",
      description:
        "Consistenza croccante e sapore delicato di nocciola. Un classico versatile, ottimo in panini gourmet, poke bowl e insalate composte.",
      price: 340,
      stock: 20,
      images: ["/images/products/girasole.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Basilico Genovese Micro",
      slug: "basilico-genovese-micro",
      description:
        "Tutto l'aroma del basilico genovese concentrato in foglioline minuscole. Perfetto per guarnire piatti di pasta, pizza e antipasti mediterranei.",
      price: 400,
      stock: 16,
      images: ["/images/products/basilico-genovese-micro.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Bietola Rossa",
      slug: "bietola-rossa",
      description:
        "Steli rosso rubino e foglie verde scuro, con un gusto terroso leggermente dolce. Un tocco di colore d'impatto per piatti gourmet e finger food.",
      price: 380,
      stock: 15,
      images: ["/images/products/bietola-rossa.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Crescione",
      slug: "crescione",
      description:
        "Note piccanti e fresche, ricco di vitamina C. Ottimo abbinato a formaggi freschi, uova e panini gourmet.",
      price: 370,
      stock: 12,
      images: ["/images/products/crescione.jpg"],
      categorySlug: "piccanti",
    },
    {
      name: "Amaranto Rosso",
      slug: "amaranto-rosso",
      description:
        "Colore porpora intenso, tra i più scenografici in assoluto. Gusto leggermente acidulo e dolce, perfetto per decorare piatti da fine dining.",
      price: 410,
      stock: 14,
      images: ["/images/products/amaranto-rosso.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Coriandolo",
      slug: "coriandolo",
      description:
        "Aroma pungente e riconoscibile, amatissimo in cucina asiatica e messicana. Verde brillante, cresce in pochi giorni.",
      price: 380,
      stock: 16,
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Shiso Rosso",
      slug: "shiso-rosso",
      description:
        "Foglia bicolore, viola scuro sopra e verde sotto, con note di menta e agrumi. Una delle varietà più scenografiche e ricercate dagli chef.",
      price: 450,
      stock: 10,
      images: ["/images/products/shiso-rosso.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Cavolo Rosso",
      slug: "cavolo-rosso",
      description:
        "Colore magenta acceso e consistenza croccante. Molto richiesto dagli chef proprio per l'impatto visivo su piatto.",
      price: 390,
      stock: 15,
      images: ["/images/products/cavolo-rosso.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Nasturzio",
      slug: "nasturzio",
      description:
        "Gusto speziato e leggermente dolce, con fiorellini eduli inclusi. Uno dei preferiti degli chef stellati per il suo impatto visivo.",
      price: 480,
      stock: 8,
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Radicchio Variegato",
      slug: "radicchio-variegato",
      description:
        "Colore rosso vinaccia con venature bianche, gusto amarognolo tipicamente italiano. Un omaggio alle radici del nostro territorio.",
      price: 400,
      stock: 12,
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Cavolo Nero Toscano",
      slug: "cavolo-nero-toscano",
      description:
        "Verde blu intenso e struttura robusta, gusto erbaceo e persistente. Un classico della tradizione toscana in versione micro.",
      price: 400,
      stock: 12,
      images: ["/images/products/cavolo-nero-toscano.jpg"],
      categorySlug: "dolci",
    },
    {
      name: "Kit Piccante",
      slug: "kit-piccante",
      description:
        "Il trio più deciso della nostra gamma: Ravanello Piccante, Senape Rossa e Crescione. Per chi ama i sapori forti su tartare, carne e taglieri.",
      price: 990,
      stock: 25,
      images: [],
      categorySlug: "kit-degustazione",
    },
    {
      name: "Kit Delicato",
      slug: "kit-delicato",
      description:
        "Un trio morbido e versatile: Piselli, Girasole e Basilico Genovese. Perfetto per insalate, panini gourmet e primi piatti.",
      price: 990,
      stock: 25,
      images: [],
      categorySlug: "kit-degustazione",
    },
    {
      name: "Kit Chef Arcobaleno",
      slug: "kit-chef-arcobaleno",
      description:
        "Il nostro kit più scenografico: un assaggio di tutte le varietà più colorate della gamma, dal porpora dell'amaranto al magenta del cavolo rosso. Ideale per chi vuole scoprire l'intera collezione Baby Greens Bari.",
      price: 1690,
      stock: 20,
      images: [],
      categorySlug: "kit-degustazione",
    },
    {
      name: "Kit Toscano",
      slug: "kit-toscano",
      description:
        "Un trio dal carattere tutto italiano: Cavolo Nero Toscano, Radicchio Variegato e Rucola Selvatica. Amaro, terroso, identitario.",
      price: 1090,
      stock: 20,
      images: [],
      categorySlug: "kit-degustazione",
    },
    {
      name: "Kit Fiorito",
      slug: "kit-fiorito",
      description:
        "Nasturzio, Amaranto Rosso e Shiso Rosso: il trio più colorato e floreale, con i fiorellini eduli del nasturzio come tocco finale.",
      price: 1190,
      stock: 15,
      images: [],
      categorySlug: "kit-degustazione",
    },
    {
      name: "Kit Aromatico",
      slug: "kit-aromatico",
      description:
        "Coriandolo, Basilico Genovese e Crescione: un trio pensato per chi ama gli aromi decisi in cucina, dall'asiatico al mediterraneo.",
      price: 990,
      stock: 20,
      images: [],
      categorySlug: "kit-degustazione",
    },
    {
      name: "Kit Coltivazione Girasole",
      slug: "kit-coltivazione-girasole",
      description:
        "Tutto il necessario per coltivare i tuoi microgreens di girasole in casa: semi certificati, tappetino di coltivazione e istruzioni passo passo. Pronti in 10 giorni.",
      price: 1200,
      stock: 40,
      images: ["/images/products/kit-coltivazione-girasole.jpg"],
      categorySlug: "kit-coltivazione",
    },
    {
      name: "Kit Coltivazione Piselli",
      slug: "kit-coltivazione-piselli",
      description:
        "Kit completo per coltivare pea shoots freschi sul tuo davanzale: semi, vassoio riutilizzabile e guida illustrata. Ideale per iniziare con i microgreens.",
      price: 1200,
      stock: 35,
      images: ["/images/products/kit-coltivazione-piselli.jpg"],
      categorySlug: "kit-coltivazione",
    },
  ];

  for (const p of products) {
    const { categorySlug, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: { ...data, categoryId: categoryRecords[categorySlug].id },
    });
  }

  // Retired products/categories from earlier catalog revisions — clean them up
  // so redeploys don't leave orphaned items visible in the shop.
  const retiredProductSlugs = ["box-degustazione-chef", "box-piccante-mensile"];
  await prisma.product.deleteMany({ where: { slug: { in: retiredProductSlugs } } });
  await prisma.category.deleteMany({ where: { slug: "box-abbonamento" } });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
