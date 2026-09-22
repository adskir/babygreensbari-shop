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
    { name: "Box in abbonamento", slug: "box-abbonamento" },
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
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Senape Rossa",
      slug: "senape-rossa",
      description:
        "Colore rosso intenso e sapore pungente simile al wasabi. Un tocco scenico e deciso per piatti di carne, tartare e taglieri gourmet.",
      price: 420,
      stock: 14,
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Rucola Selvatica",
      slug: "rucola-selvatica",
      description:
        "Versione in miniatura della rucola che conosci, con un aroma ancora più concentrato e note pepate. Ottima su pizze, bruschette e primi piatti.",
      price: 360,
      stock: 22,
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Piselli (Pea Shoots)",
      slug: "piselli-pea-shoots",
      description:
        "Germogli di pisello dolci e croccanti, con un sapore fresco che ricorda i piselli appena sgranati. Ideali crudi in insalata o saltati in padella all'ultimo minuto.",
      price: 350,
      stock: 25,
      images: [],
      categorySlug: "dolci",
    },
    {
      name: "Girasole",
      slug: "girasole",
      description:
        "Consistenza croccante e sapore delicato di nocciola. Un classico versatile, ottimo in panini gourmet, poke bowl e insalate composte.",
      price: 340,
      stock: 20,
      images: [],
      categorySlug: "dolci",
    },
    {
      name: "Basilico Genovese Micro",
      slug: "basilico-genovese-micro",
      description:
        "Tutto l'aroma del basilico genovese concentrato in foglioline minuscole. Perfetto per guarnire piatti di pasta, pizza e antipasti mediterranei.",
      price: 400,
      stock: 16,
      images: [],
      categorySlug: "dolci",
    },
    {
      name: "Bietola Rossa",
      slug: "bietola-rossa",
      description:
        "Steli rosso rubino e foglie verde scuro, con un gusto terroso leggermente dolce. Un tocco di colore d'impatto per piatti gourmet e finger food.",
      price: 380,
      stock: 15,
      images: [],
      categorySlug: "dolci",
    },
    {
      name: "Crescione",
      slug: "crescione",
      description:
        "Note piccanti e fresche, ricco di vitamina C. Ottimo abbinato a formaggi freschi, uova e panini gourmet.",
      price: 370,
      stock: 12,
      images: [],
      categorySlug: "piccanti",
    },
    {
      name: "Box degustazione Chef",
      slug: "box-degustazione-chef",
      description:
        "Selezione settimanale di 4 varietà scelte dal nostro team in base al raccolto — perfetta per scoprire tutta la gamma Baby Greens Bari. Consegna ogni venerdì.",
      price: 1490,
      stock: 30,
      images: [],
      categorySlug: "box-abbonamento",
    },
    {
      name: "Box Piccante Mensile",
      slug: "box-piccante-mensile",
      description:
        "Abbonamento mensile con 4 consegne settimanali delle nostre varietà piccanti: ravanello, senape rossa, rucola e crescione. Disdici quando vuoi.",
      price: 4900,
      stock: 20,
      images: [],
      categorySlug: "box-abbonamento",
    },
    {
      name: "Kit Coltivazione Girasole",
      slug: "kit-coltivazione-girasole",
      description:
        "Tutto il necessario per coltivare i tuoi microgreens di girasole in casa: semi certificati, tappetino di coltivazione e istruzioni passo passo. Pronti in 10 giorni.",
      price: 1200,
      stock: 40,
      images: [],
      categorySlug: "kit-coltivazione",
    },
    {
      name: "Kit Coltivazione Piselli",
      slug: "kit-coltivazione-piselli",
      description:
        "Kit completo per coltivare pea shoots freschi sul tuo davanzale: semi, vassoio riutilizzabile e guida illustrata. Ideale per iniziare con i microgreens.",
      price: 1200,
      stock: 35,
      images: [],
      categorySlug: "kit-coltivazione",
    },
  ];

  for (const p of products) {
    const { categorySlug, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...data, categoryId: categoryRecords[categorySlug].id },
    });
  }

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
