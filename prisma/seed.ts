import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const shopPassword = await bcrypt.hash("shop123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      name: "Administrator",
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { username: "shopkeeper" },
    update: {},
    create: {
      username: "shopkeeper",
      password: shopPassword,
      name: "Shop Keeper",
      role: "shopkeeper",
    },
  });

  const vegCategory = await prisma.category.upsert({
    where: { name: "Vegetables" },
    update: {},
    create: { name: "Vegetables", description: "Fresh vegetables from local farms" },
  });

  const fruitCategory = await prisma.category.upsert({
    where: { name: "Fruits" },
    update: {},
    create: { name: "Fruits", description: "Seasonal fresh fruits" },
  });

  const herbCategory = await prisma.category.upsert({
    where: { name: "Herbs" },
    update: {},
    create: { name: "Herbs", description: "Fresh herbs and spices" },
  });

  const products = [
    { name: "Tomato", categoryId: vegCategory.id, unit: "kg", price: 80 },
    { name: "Potato", categoryId: vegCategory.id, unit: "kg", price: 60 },
    { name: "Onion", categoryId: vegCategory.id, unit: "kg", price: 100 },
    { name: "Spinach", categoryId: vegCategory.id, unit: "kg", price: 40 },
    { name: "Carrot", categoryId: vegCategory.id, unit: "kg", price: 70 },
    { name: "Apple", categoryId: fruitCategory.id, unit: "kg", price: 200 },
    { name: "Banana", categoryId: fruitCategory.id, unit: "dozen", price: 120 },
    { name: "Mango", categoryId: fruitCategory.id, unit: "kg", price: 250 },
    { name: "Orange", categoryId: fruitCategory.id, unit: "kg", price: 150 },
    { name: "Grapes", categoryId: fruitCategory.id, unit: "kg", price: 180 },
    { name: "Coriander", categoryId: herbCategory.id, unit: "bundle", price: 20 },
    { name: "Mint", categoryId: herbCategory.id, unit: "bundle", price: 15 },
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { name_categoryId: { name: p.name, categoryId: p.categoryId } },
      update: { currentPrice: p.price },
      create: {
        name: p.name,
        categoryId: p.categoryId,
        unit: p.unit,
        currentPrice: p.price,
      },
    });

    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        quantity: Math.floor(Math.random() * 50) + 10,
      },
    });
  }

  const supplierData = [
    { name: "Fresh Farm Supplies", contact: "0300-1234567", address: "Main Bazaar, Lahore" },
    { name: "Green Valley Growers", contact: "0301-2345678", address: "Sahiwal Road, Multan" },
    { name: "Organic Harvest Co", contact: "0302-3456789", address: "Faisalabad" },
  ];

  const suppliers = [];
  for (const s of supplierData) {
    const existing = await prisma.supplier.findFirst({ where: { name: s.name } });
    if (!existing) {
      suppliers.push(await prisma.supplier.create({ data: s }));
    } else {
      suppliers.push(existing);
    }
  }

  const customerData = [
    { name: "Ahmed Traders", contact: "0303-4567890", address: "Gulberg, Lahore" },
    { name: "Bismillah Store", contact: "0304-5678901", address: "Ichra, Lahore" },
    { name: "Al-Rahim General Store", contact: "0305-6789012", address: "Johar Town, Lahore" },
  ];

  const customers = [];
  for (const c of customerData) {
    const existing = await prisma.customer.findFirst({ where: { name: c.name } });
    if (!existing) {
      customers.push(await prisma.customer.create({ data: c }));
    } else {
      customers.push(existing);
    }
  }

  await prisma.employee.create({
    data: {
      name: "Ali Raza",
      position: "Salesman",
      contact: "0306-7890123",
      salary: 25000,
    },
  });

  await prisma.employee.create({
    data: {
      name: "Sana Khan",
      position: "Cashier",
      contact: "0307-8901234",
      salary: 20000,
    },
  });

  console.log("Seed completed successfully!");
  console.log("Admin login: admin / admin123");
  console.log("Shopkeeper login: shopkeeper / shop123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
