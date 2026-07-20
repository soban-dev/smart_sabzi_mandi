import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        customer: true,
        items: { include: { product: true } },
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sales" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, date, notes, items } = body;

    const itemsWithTotals = items.map(
      (item: { productId: number; quantity: number; unitPrice: number }) => ({
        productId: parseInt(item.productId as unknown as string),
        quantity: parseFloat(item.quantity as unknown as string),
        unitPrice: parseFloat(item.unitPrice as unknown as string),
        totalPrice:
          parseFloat(item.quantity as unknown as string) *
          parseFloat(item.unitPrice as unknown as string),
      })
    );

    for (const item of itemsWithTotals) {
      const inventory = await prisma.inventory.findUnique({
        where: { productId: item.productId },
      });
      if (!inventory || inventory.quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${item.productId}` },
          { status: 400 }
        );
      }
    }

    const totalAmount = itemsWithTotals.reduce(
      (sum: number, item: { totalPrice: number }) => sum + item.totalPrice,
      0
    );

    const sale = await prisma.sale.create({
      data: {
        customerId: customerId ? parseInt(customerId) : undefined,
        date: date ? new Date(date) : undefined,
        notes,
        totalAmount,
        items: {
          create: itemsWithTotals,
        },
      },
      include: {
        customer: true,
        items: { include: { product: true } },
      },
    });

    for (const item of itemsWithTotals) {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    return NextResponse.json(sale, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create sale" },
      { status: 500 }
    );
  }
}
